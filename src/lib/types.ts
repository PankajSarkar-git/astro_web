export interface WalletTransaction {
  id: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  description: string;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  description: string;
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
    user: {
      id: string;
      name: string | null;
      mobile: string;
      gender: string | null;
      birthDate: string | null;
      birthTime: string | null;
      birthPlace: string | null;
      latitude: string | null;
      longitude: string | null;
      imgUri: string;
      role: string;
      walletBalance: number;
      createdAt: string;
      updatedAt: string;
      freeChatUsed: boolean;
    };
  };
  isLastPage: boolean;
  totalPages: number;
  currentPage: number;
}

export interface User {
  id: string;
  name: string | null;
  mobile: string;
  gender: string | null;
  birthDate: string | null;
  birthTime: string | null;
  birthPlace: string | null;
  latitude: string | null;
  longitude: string | null;
  imgUri: string;
  role: string;
  wallet: {
    id: string;
    balance: number;
    transactions: WalletTransaction[];
  };
  createdAt: string;
  updatedAt: string;
  freeChatUsed: boolean;
}

export interface UserResponse {
  msg: string;
  success: boolean;
  user: User;
}

// User info nested in Astrologer
export interface AstrologerUser {
  id: string;
  name: string;
  mobile: string;
  gender?: string | null;
  birthDate?: string | null;
  birthTime?: string | null;
  birthPlace?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  imgUri?: string | null;
  role: string;
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
}

// Main Astrologer object structure
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
}

// Response when getting astrologers
export interface GetAstrologersResponse {
  astrologers: Astrologer[];
  totalPages: number;
  currentPage: number;
}

// State shape for Redux slice
export interface AstrologerState {
  astrologers: Astrologer[];
  selectedAstrologer: Astrologer | null;
  loading: boolean;
  error: string | null;
}

// Payload for create/edit action (JSON part)
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

// Payload for createAstrologer thunk
export interface CreateAstrologerThunkInput {
  astrologerData: AstrologerFormPayload;
  imageFile?: File;
}

// Payload for editAstrologer thunk
export interface EditAstrologerThunkInput extends CreateAstrologerThunkInput {
  id: string;
}
