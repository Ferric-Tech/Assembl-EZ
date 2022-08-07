export interface ClientData {
  profile: ProfileData;
  leads: LeadData;
}

export interface ProfileData {
  [key: string]: any;
}

export interface LeadData {
  [key: string]: any;
}
