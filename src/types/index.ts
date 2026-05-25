export interface User {
  id: string;
  email: string;
  name: string;
  role: 'RETAILER' | 'DISTRIBUTOR' | 'ADMIN';
  orgId?: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  shopName?: string;
}

export type ImageClassification = 'INDOOR' | 'OUTDOOR' | 'INVALID';

export interface UploadedImage {
  id: string;
  s3Key: string;
  cdnUrl: string;
  classification: ImageClassification;
  width: number;
  height: number;
  createdAt: string;
}

export type SegmentationType = 'MAIN_WALL' | 'ACCENT_WALL' | 'TRIM' | 'MANUAL';

export interface Region {
  id: string;
  type: SegmentationType;
  maskUrl: string;
  colorHex: string | null;
  shadeName: string | null;
  shadeCode: string | null;
}

export type ProjectStatus = 'CREATED' | 'SEGMENTING' | 'READY' | 'ERROR';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  image: UploadedImage;
  regions: Region[];
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ColorFamily =
  | 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'BLUE'
  | 'PURPLE' | 'PINK' | 'BROWN' | 'GREY' | 'WHITE' | 'BLACK';

export type Finish = 'MATTE' | 'EGGSHELL' | 'SATIN' | 'SEMI_GLOSS' | 'GLOSS';

export interface Shade {
  id: string;
  code: string;
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  colorFamily: ColorFamily;
  lrv: number;
  finishes: Finish[];
  brand: 'ASIAN_PAINTS' | 'BERGER' | 'NEROLAC';
}

export type SubscriptionTier = 'STARTER' | 'PROFESSIONAL' | 'BUSINESS' | 'ENTERPRISE';

export interface Subscription {
  tier: SubscriptionTier;
  aiGenerationsUsed: number;
  aiGenerationsLimit: number;
  renewsAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}
