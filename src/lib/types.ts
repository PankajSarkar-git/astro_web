// ========== Common ==========

export type Gender = "MALE" | "FEMALE" | "OTHER" | string;
export type Role = "USER" | "ASTROLOGER" | "ADMIN" | string;
export type WalletTransactionType = "CREDIT" | "DEBIT";

// ========== Wallet ==========

export interface WalletTransaction {
  id: string;
  amount: number;
  type: WalletTransactionType;
  description: string;
  createdAt: string;
  timestamp: string;
}

export interface Wallet {
  id: string;
  balance: number;
  transactions: WalletTransaction[];
}

export interface WalletResponse {
  msg: string;
  success: boolean;
  totalItems: number;
  wallet: {
    id: string;
    balance: number;
    transactions: WalletTransaction[];
    user: User;
  };
  isLastPage: boolean;
  totalPages: number;
  currentPage: number;
}

// ========== User ==========

export interface User {
  id: string;
  name: string | null;
  mobile: string;
  gender: Gender | null;
  birthDate: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  latitude: string | null;
  longitude: string | null;
  imgUri: string;
  role: Role;
  wallet: Wallet;
  createdAt: string;
  updatedAt: string;
  freeChatUsed: boolean;
}

export interface UserResponse {
  msg: string;
  success: boolean;
  user: User;
}

// ========== Astrologer ==========

export interface AstrologerUser {
  id: string;
  name: string;
  mobile: string;
  gender?: Gender | null;
  birthDate?: string | null;
  birthTime?: string | null;
  birthPlace?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  imgUri?: string | null;
  role: Role;
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
  freeChatUsed: boolean;
}

export interface Astrologer {
  id: string;
  user: AstrologerUser;
  expertise: string;
  experienceYears: number;
  languages: string;
  about?: string | null;
  pricePerMinuteChat: number;
  pricePerMinuteVoice: number;
  pricePerMinuteVideo: number;
  blocked: boolean;
  online: boolean;
}

export interface GetAstrologersResponse {
  astrologers: Astrologer[];
  totalPages: number;
  currentPage: number;
}

// ========== Astrologer Redux ==========

export interface AstrologerState {
  astrologers: Astrologer[];
  selectedAstrologer: Astrologer | null;
  loading: boolean;
  error: string | null;
}

// ========== Payloads ==========

export interface AstrologerFormPayload {
  name: string;
  mobile: string;
  expertise: string;
  experienceYears: number;
  pricePerMinuteChat: number;
  pricePerMinuteVoice: number;
  pricePerMinuteVideo: number;
  about?: string;
  languages?: string;
}

export interface CreateAstrologerThunkInput {
  astrologerData: AstrologerFormPayload;
  imageFile?: File;
}

export interface EditAstrologerThunkInput extends CreateAstrologerThunkInput {
  id: string;
}



export interface Stats {
  totalUsers: number;
  totalAstrologers: number;
  totalUserWalletBalance: number;
  totalAstrologerWalletBalance: number;
  totalAdminWalletBalance:number;
}

export interface MonthlyProfit {
  month: string;
  profit: number;
}

export interface StatsResponse {
  msg: string;
  stats: Stats;
  success: boolean;
}

export interface MonthlyProfitResponse {
  msg: string;
  success: boolean;
  monthlyProfits: MonthlyProfit[];
}