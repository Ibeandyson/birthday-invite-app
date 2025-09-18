export interface Guest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  uniqueCode: string;
  extraGuests: number;
  isCheckedIn: boolean;
  registeredAt: Date;
  checkedInAt?: Date;
}

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  extraGuests?: number;
}

export interface CheckInFormData {
  email: string;
}
