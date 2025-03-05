// export type Appointment = {
//   id: string;
//   bookingDate: string;
//   time: string;
//   doctorResponse?: {
//     id: string;
//     name: string;
//     email: string;
//     phoneNo: string;
//     dateOfBirth: string;
//     gender: string;
//   };
//   medicineResponse?: {
//     id: string;
//     name: string;
//   };
//   description: string;
//   status: string;
//   bookingType: string;
//   userResponse: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNo: string;
//     dateOfBirth: string;
//     gender: string;
//   };
// };

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  preSignedUrl: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  role: string | null;
  active: boolean;
}

export interface SpecializationResponse {
  id: number;
  name: string;
  active: boolean;
}

export interface DoctorResponse {
  id: number;
  userResponse: UserResponse;
  specializationResponse: SpecializationResponse;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: number;
  consultationDuration: number;
  dayTimeSlotResponses: unknown | null;
  verified: boolean;
}

export interface PetResponses {
  id: number;
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  userId: number | null;
  genderType: 'MALE' | 'FEMALE';
  image: string;
  createdDate: string | null;
  updatedDate: string | null;
  active: boolean;
}

export interface Appointment {
  id: string;
  bookingTime: string;
  doctorResponse: DoctorResponse;
  userResponse: UserResponse;
  petResponse: PetResponses;
  bookingDate: string;
  bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELED';
  medium: 'VIRTUAL' | 'IN_PERSON';
  reason: string;
  note: string;
  createdDate: string;
  updatedDate: string;
}

// Rest of

export type HospitalCreate = {
  name: string;
  description?: string;
  cityId: number;
  district: string;
  province: string;
  address: string;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  phoneNumber: string;
  email: string;
  website?: string;
  medicineIds: number[];
};

export type Role = {
  id: number;
  name: string;
};

// export type Doctor = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNo: string;
//   dateOfBirth: string;
//   gender: string;
//   image: string | null;
//   preSignedUrl: string | null;
//   createdDate: string;
//   updatedDate: string;
//   role: Role;
//   active: boolean;
//   specializationResponse: {
//     id: number;
//     name: string;
//     active: boolean;
//   };
//   bio: string;
//   qualification: string;
//   experience: string;
//   paymentPerSession: number;
//   consultationDuration: number;
//   dayTimeSlotResponses: {
//     day: string;
//     timeSlots: { startTime: string; endTime: string }[];
//     appointmentTimes: string[];
//   }[];
//   verified: boolean;
// };

interface SpecializationD {
  name: string;
}

interface UserResponseD {
  firstName?: string;
  lastName?: string;
}

interface PetD {
  preSignedUrl: string;
  name: string;
  description: string;
}

interface HospitalD {
  hospitalName: string;
  services: string[];
}
interface TimeSlot {
  id: number;
  appointmentTime: string;
}

interface DaySchedule {
  startTime: string;
  endTime: string;
  hospitalId: number;
  hospitalName: string;
  mediumList: string[];
  appointmentTimeResponses: TimeSlot[];
}

interface DayTimeSlot {
  day: string;
  date: string;
  timeSlots: DaySchedule[];
}

export type Doctor = {
  id: string;
  preSignedUrl: string;
  userResponse: UserResponseD;
  specializationResponse: SpecializationD;
  description: string;
  petResponses?: PetD[];
  hospitalDetails?: HospitalD[];
  dayTimeSlotResponses?: DayTimeSlot[];


};



export type DoctorCreate = {
  registerRequest: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
    role: number;
  };
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: number;
  consultationDuration: number;
  specializationId: number;
};

export type DayTimeSlotResponses = {
  day: string;
  timeSlots: { startTime: string; endTime: string; hospitalId: number; hospitalName: string }[] | [];
  appointmentTimes: string[];
};

export type PetResponse = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
export type Department = {
  name: string;
  description: string;
};

export type Pet = {
  id?:number;
  name?: string;
  description?: string;
  petType?: string;
  breed?: string;
  age?: number;
  weight?: number;
  medicalConditions?: string[];
  healthRecords?:HealthRecord[];
  userId?: number;
  genderType?: string;
  image?: File;
};

export interface HealthRecord {
  pastTreatments: string[];
  documents?: File[];
  otherTreatment?: string;
}

export type Medicine = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  duration: number;
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export type MedicineCreate = {
  name: string;
  description: string;
  duration: number;
};

export type Specialization = {
  id: number;
  name: string;
  active: boolean;
};


export type City={
  id:number;
  name:string;
}
export type AppointmentCreate = {
  id?: string;
  bookingTimeId?: number;
  petId?: number;
  bookingDate?: string;
  appointmentTime?: string;
  reason?: string;
  note?: string;
  medium?: "VIRTUAL" | "PHYSICAL";
  emergencyReason?: string;
  guest?: boolean;
  firstName?: string;
  lastName?: string;
  mail?: string;
  mobile?: string;
  petName?: string;
  petType?: string;
  breed?: string;
  age?: string;
  weight?: number;
  medicalConditions?: string[];
  genderType?: "MALE" | "FEMALE";
  medicalCareTypes?: string;
  emergency?: boolean;
};
export type dayTimeSlotResponses = {
  day: string;
  medicineTimeSlots: { startTime: string; endTime: string }[] | [];
  appointmentTimes: string[];
};

export type DoctorBooking = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specialization: string;
  description: string;
  department: string;
};

export type UserBooking = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
};
export type MedicineBooking = {
  name: string;
  description: string;
};

export type Booking = {
  id: string;
  bookingDate: string;
  time: string;
  description: string;
  status: string;
  bookingType: string;
  petName: string;
  petAge: string;
  petType: string;
  createdDate: string;
  updatedDate: string;
  doctorResponse: DoctorBooking;
  medicineResponse: MedicineBooking;
  userResponse: UserBooking;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  image: string;
  preSignedUrl: string;
  role: string;
  active: boolean;
};



export type doctorResponses = {
  id: number;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: number;
  specializationName: string;
  description: string;
  departmentId: number | null;
  departmentName: string | null;
  qualification: string | null;
  image: string | null;
  preSignedUrl: string | null;
  duration: number;
  dayTimeSlotResponses:
    | {
        day: string;
        timeSlots: { startTime: string; endTime: string }[];
        appointmentTimes: string[];
      }[]
    | null;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
