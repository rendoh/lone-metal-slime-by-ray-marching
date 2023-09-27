#include ../utils/cnoise-2d.glsl;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uBounce;
uniform float uMouthClosedness;

const float PI = 3.14159265;
const vec3 cameraPos = vec3(0., 1.5, 4.6);
const vec3 cameraDir = vec3(0., -0.2, -1.);
const vec3 cameraUp = vec3(0., 1., 0.);
const vec3 cameraSide = cross(cameraDir, cameraUp);

vec3 bgColor = vec3(0.8);
vec3 bodyColor = vec3(.35);
vec3 eyeColor = vec3(1.);
vec3 pupilColor = vec3(0.);

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float smin( float a, float b, float k ) {
  float h = max( k-abs(a-b), 0.0 )/k;
  return min( a, b ) - h*h*k*(1.0/4.0);
}

float smax( float d1, float d2, float k ) {
  float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
  return mix( d2, d1, h ) + k*h*(1.0-h);
}

float sdSphere( vec3 p, float s ) {
  return length(p) - s;
}

float sdCappedTorus( vec3 p, vec2 sc, float ra, float rb) {
  p.x = abs(p.x);
  float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
  return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
}

float sdCutSphere( vec3 p, float r, float h )
{
  float w = sqrt(r*r-h*h);
  vec2 q = vec2( length(p.xz), p.y );
  float s = max( (h-r)*q.x*q.x+w*w*(h+r-2.0*q.y), h*q.x-w*q.y );
  return (s<0.0) ? length(q)-r :
         (q.x<w) ? h - q.y     :
                   length(q-vec2(w,h));
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h ) {
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
}

float cylinderRadiusNoise = 0.;
vec3 headPos = vec3(0.);
float bodyScale = 1.;
vec3 pupilPos = vec3(0.);

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

struct Intersect {
  float dist;
  vec3 color;
};

Intersect sdf(vec3 p) {
  float sphere = sdCutSphere(p + vec3(0., 0.4, -0.1) + headPos, 1.4, 0.4);
  float s = .6;

  float cylinder = sdRoundedCylinder(p, 1.2 + bodyScale + cylinderRadiusNoise, 0.08, .0);
  float body = smin(sphere, cylinder, 0.6);
  vec3 mouthPos = rotate(p + vec3(0., -0.7, -0.42) + headPos, vec3(0, 0, -1.), PI);
  mouthPos = rotate(mouthPos, vec3(1., 0., 0.), PI * 0.42);
  float mouth = sdCappedTorus(mouthPos, vec2(sin(s), cos(s)), .8, .04 - 0.4 * uMouthClosedness);
  float final = smax(body, -mouth, .05);
  for (float i = 0.; i < 6.; i++) {
    float rand = rand(vec2(i, 0));
    float r = rand * 30. + uTime * 0.0003 * (mod(i, 2.) - .5);
    float progress = fract(uTime * 0.0004 * mix(0.7, 1.3, rand) + rand);
    vec3 pos = vec3(sin(r), 0., cos(r)) * 1.65 * mix(0.8, 1.2, rand) + vec3(0., .05, 0.);
    float bubbleToTop = sdSphere(p + pos + vec3(0., -5., 0.) * pow(progress, 1.75), (.5 + rand) * .15 * (1.0 - smoothstep(.7, 1., progress)));
    final = smin(final, bubbleToTop, .2);
  }

  float leftEye = sdRoundedCylinder(rotate(p + vec3(-0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.06, 0.0005, 0.0005);
  float rightEye = sdRoundedCylinder(rotate(p + vec3(0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.06, 0.0005, 0.0005);

  float leftPupil = sdRoundedCylinder(rotate(p + pupilPos + vec3(-0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.03, 0.001, 0.001);
  float rightPupil = sdRoundedCylinder(rotate(p + pupilPos + vec3(0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.03, 0.001, 0.001);

  final = min(rightPupil, min(leftPupil, min(rightEye, min(leftEye, final))));

  Intersect i;
  i.dist = final;
  i.color = (min(leftEye, rightEye) <= final) ? eyeColor : bodyColor;
  i.color = (min(leftPupil, rightPupil) <= final) ? pupilColor : i.color;
  i.color = mouth - .03 <= final ? pupilColor : i.color;
  return i;
}

vec3 getNormal(in vec3 p) {
  const float eps = .0001;
  const vec2 h = vec2(eps, 0);
  return normalize(vec3(
    sdf(p + h.xyy).dist - sdf(p - h.xyy).dist,
    sdf(p + h.yxy).dist - sdf(p - h.yxy).dist,
    sdf(p + h.yyx).dist - sdf(p - h.yyx).dist
  ));
}

void main() {
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 m = vec2(uMouse.x * (1. / aspectRatio), uMouse.y);// アスペクト補正したマウス座標
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.x;

  vec3 lightDir = -normalize(vec3(-m.x * 2., -2.8 - m.y, -1.));
  vec3 ray = normalize(cameraSide * p.x + cameraUp * p.y + cameraDir);

  vec3 rayPos = cameraPos;
  float offsetY = 0.11 * sin(uTime * 0.002);
  cylinderRadiusNoise = cnoise(p * 3.2 + uTime * .0005) * 0.1;
  headPos = vec3(0.25 * sin(uTime * 0.0012), offsetY + uBounce, 0.15 * cos(uTime * 0.003));
  bodyScale = offsetY * .6;
  vec2 nm = length(m) > 1. ? normalize(m) : m;
  pupilPos = vec3(nm.x * -0.05, nm.y * -0.05 - .015, -.05);
  float tmp = 0.;
  float dist = 0.;
  vec3 color;
  for(int i = 0; i < 64; i++){
    rayPos = cameraPos + tmp * ray;
    Intersect result = sdf(rayPos);
    dist = result.dist;
    color = result.color;
    if (dist < 0.003 || tmp > 8.) break;
    tmp += dist;
  }

  if (dist < 0.5) {
    vec3 normal = getNormal(rayPos);
    float diffuse = clamp(dot(normal, lightDir), 0., 1.);
    float specular = pow(diffuse, 38.);
    color = color * diffuse + vec3(specular);
  } else {
    color = bgColor;
  }

  gl_FragColor = vec4(color, 1.0);
}
