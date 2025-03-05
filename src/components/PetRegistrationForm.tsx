// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '@/components/ui/form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuthStore } from '@/store/authStore';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import Image from 'next/image';

// interface Pet {
//   name: string;
//   petType: string;
//   breed: string;
//   age: number;
//   weight: number;
//   medicalConditions: string[];
//   genderType: string;
//   image?: string;
// }

// interface HealthRecord {
//   pastTreatments: string[];
//   documents?: File[];
//   otherTreatment?: string;
// }

// const petRegistrationSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   petType: z.string().min(1, 'Pet type is required'),
//   breed: z.string().min(1, 'Breed is required'),
//   age: z.number().min(1, 'Age must be greater than 0'),
//   weight: z.number().min(0, 'Weight must be greater than 0'),
//   medicalConditions: z.array(z.string()).default([]),
//   genderType: z.string().min(1, 'Gender type is required'),
//   userId: z.number().min(1, 'UserId is required'),
//   image: z.instanceof(File).optional(),
// });

// const healthRecordSchema = z.object({
//   pastTreatments: z.array(z.string()).default([]),
//   documents: z.array(z.instanceof(File)).default([]),
//   otherTreatment: z.string().optional(),
// });

// type PetRegistrationFormData = z.infer<typeof petRegistrationSchema>;
// type HealthRecordFormData = z.infer<typeof healthRecordSchema>;

// interface PetRegistrationFormProps {
//   onSubmit: (data: PetRegistrationFormData) => void;
//   onHealthRecordSubmit?: (data: HealthRecordFormData) => void;
//   pet?: any;
//   healthRecord?: any;
// }

// const PetRegistrationForm: React.FC<PetRegistrationFormProps> = ({
//   onSubmit,
//   onHealthRecordSubmit,
//   pet,
//   healthRecord,
// }) => {
//   const login = useAuthStore((state) => state.login);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<string>('petProfile');
//   const [documents, setDocuments] = useState<File[]>([]);
//   const [isOtherTreatmentSelected, setIsOtherTreatmentSelected] =
//     useState(false);
//   const standardTreatments = [
//     'Vaccination for Rabies',
//     'Deworming',
//     'General Checkup',
//     'Surgery',
//     'Dental Cleaning',
//   ];

//   // Pet profile form
//   const form = useForm<PetRegistrationFormData>({
//     resolver: zodResolver(petRegistrationSchema),
//     defaultValues: {
//       name: pet?.name || '',
//       petType: pet?.petType || 'Dog',
//       breed: pet?.breed || '',
//       age: pet?.age || undefined,
//       weight: pet?.weight || undefined,
//       medicalConditions: pet?.medicalConditions || [],
//       genderType: pet?.genderType || 'MALE',
//       userId: Number(login?.userId),
//     },
//   });

//   const healthRecordForm = useForm<HealthRecordFormData>({
//     resolver: zodResolver(healthRecordSchema),
//     defaultValues: {
//       pastTreatments: healthRecord?.pastTreatments || [],
//       documents: [],
//     },
//   });

//   // Set initial image if pet has one
//   useEffect(() => {
//     if (pet?.image) {
//       setImageSrc(pet.image);
//     }
//   }, [pet]);

//   // Check if "Other" is in the initial pastTreatments
//   useEffect(() => {
//     const initialTreatments = pet?.healthRecord?.pastTreatments || [];
//     const nonStandardTreatments = initialTreatments.filter(
//       (treatment: string) => !standardTreatments.includes(treatment)
//     );

//     if (nonStandardTreatments.length > 0) {
//       setIsOtherTreatmentSelected(true);
//       healthRecordForm.setValue('otherTreatment', nonStandardTreatments[0]);
//     }
//   }, [healthRecord, healthRecordForm, standardTreatments]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const fileUrl = URL.createObjectURL(file);
//       setImageSrc(fileUrl);
//       form.setValue('image', file);
//     } else {
//       setImageSrc(null);
//     }
//   };

//   const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const fileArray = Array.from(files);
//       setDocuments([...documents, ...fileArray]);
//       healthRecordForm.setValue('documents', [...documents, ...fileArray]);
//     }
//   };

//   const handleRemoveDocument = (index: number) => {
//     const newDocuments = [...documents];
//     newDocuments.splice(index, 1);
//     setDocuments(newDocuments);
//     healthRecordForm.setValue('documents', newDocuments);
//   };

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Image from 'next/image';

interface HealthRecord {
  pastTreatments: string[];
  documents?: File[];
  otherTreatment?: string;
}

interface Pet {
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  genderType: string;
  image?: string;
  healthRecord?: HealthRecord;
}

const petRegistrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  petType: z.string().min(1, 'Pet type is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.number().min(1, 'Age must be greater than 0'),
  weight: z.number().min(0, 'Weight must be greater than 0'),
  medicalConditions: z.array(z.string()).default([]),
  genderType: z.string().min(1, 'Gender type is required'),
  userId: z.number().min(1, 'UserId is required'),
  image: z.instanceof(File).optional(),
});

const healthRecordSchema = z.object({
  pastTreatments: z.array(z.string()).default([]),
  documents: z.array(z.instanceof(File)).default([]),
  otherTreatment: z.string().optional(),
});

type PetRegistrationFormData = z.infer<typeof petRegistrationSchema>;
type HealthRecordFormData = z.infer<typeof healthRecordSchema>;

interface PetRegistrationFormProps {
  onSubmit: (data: PetRegistrationFormData) => void;
  onHealthRecordSubmit?: (data: HealthRecordFormData) => void;
  pet?: Pet;
  healthRecord?: HealthRecord;
}

const PetRegistrationForm: React.FC<PetRegistrationFormProps> = ({
  onSubmit,
  onHealthRecordSubmit,
  pet,
  healthRecord,
}) => {
  const login = useAuthStore((state) => state.login);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('petProfile');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isOtherTreatmentSelected, setIsOtherTreatmentSelected] =
    useState(false);
  // Replace the standalone standardTreatments array with a memoized version
  const standardTreatments = React.useMemo(
    () => [
      'Vaccination for Rabies',
      'Deworming',
      'General Checkup',
      'Surgery',
      'Dental Cleaning',
    ],
    []
  );
  const form = useForm<PetRegistrationFormData>({
    resolver: zodResolver(petRegistrationSchema),
    defaultValues: {
      name: pet?.name || '',
      petType: pet?.petType || 'Dog',
      breed: pet?.breed || '',
      age: pet?.age || undefined,
      weight: pet?.weight || undefined,
      medicalConditions: pet?.medicalConditions || [],
      genderType: pet?.genderType || 'MALE',
      // userId: Number(login?.userId),
      userId: login?.userId ? Number(login.userId) : 0,
    },
  });

  const healthRecordForm = useForm<HealthRecordFormData>({
    resolver: zodResolver(healthRecordSchema),
    defaultValues: {
      pastTreatments: healthRecord?.pastTreatments || [],
      documents: [],
    },
  });

  useEffect(() => {
    if (pet?.image) {
      setImageSrc(pet.image);
    }
  }, [pet]);

  const pastTreatments = React.useMemo(
    () => pet?.healthRecord?.pastTreatments || [],
    [pet?.healthRecord?.pastTreatments]
  );

  useEffect(() => {
    const nonStandardTreatments = pastTreatments.filter(
      (treatment: string) => !standardTreatments.includes(treatment)
    );

    if (nonStandardTreatments.length > 0) {
      setIsOtherTreatmentSelected(true);
      healthRecordForm.setValue('otherTreatment', nonStandardTreatments[0]);
    }
  }, [pastTreatments, healthRecordForm, standardTreatments]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageSrc(fileUrl);
      form.setValue('image', file);
    } else {
      setImageSrc(null);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setDocuments([...documents, ...fileArray]);
      healthRecordForm.setValue('documents', [...documents, ...fileArray]);
    }
  };

  const handleRemoveDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
    healthRecordForm.setValue('documents', newDocuments);
  };

  const handleTreatmentChange = (treatment: string, checked: boolean) => {
    const currentTreatments = healthRecordForm.watch('pastTreatments') || [];

    if (treatment === 'Other') {
      setIsOtherTreatmentSelected(checked);
      if (!checked) {
        const standardTreatmentsOnly = currentTreatments.filter(
          (t) => standardTreatments.includes(t) || t === 'Other'
        );
        healthRecordForm.setValue('pastTreatments', standardTreatmentsOnly);
        healthRecordForm.setValue('otherTreatment', '');
      } else {
        healthRecordForm.setValue('pastTreatments', [
          ...currentTreatments,
          treatment,
        ]);
      }
    } else {
      const newTreatments = checked
        ? [...currentTreatments, treatment]
        : currentTreatments.filter((t) => t !== treatment);
      healthRecordForm.setValue('pastTreatments', newTreatments);
    }
  };

  const handleOtherTreatmentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    healthRecordForm.setValue('otherTreatment', value);
    const currentTreatments = healthRecordForm.watch('pastTreatments') || [];
    const standardTreatmentsOnly = currentTreatments.filter(
      (t) => standardTreatments.includes(t) || t === 'Other'
    );

    if (value.trim() !== '') {
      healthRecordForm.setValue('pastTreatments', [
        ...standardTreatmentsOnly,
        value,
      ]);
    } else {
      healthRecordForm.setValue('pastTreatments', standardTreatmentsOnly);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc && !pet?.image) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc, pet?.image]);

  return (
    <div className="py-6 w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden flex">
          <div className="w-1/3 bg-white p-6 text-black flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-4">PAWSMAT.A</h2>
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="petProfile"
                      className="data-[state=active]:bg-[#05c1af]"
                    >
                      Edit Pet Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="healthRecord"
                      className="data-[state=active]:bg-[#05c1af]"
                    >
                      Health Record
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            {imageSrc ? (
              <div className="relative w-full">
                <Image
                  src={imageSrc}
                  alt="Pet"
                  className="w-full h-full rounded-sm"
                  width={200}
                  height={200}
                  onError={() => setImageSrc(null)}
                />
              </div>
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center rounded-sm">
                <p>Upload a pet photo</p>
              </div>
            )}
          </div>

          <div className="w-2/3 p-8 bg-slate-50">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="petProfile">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {pet
                    ? "Update your pet's information"
                    : 'Yay, we love pets! Give us the basics about your pet.'}
                </h2>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => {
                      console.log('Submitted Pet Data:', data);
                      onSubmit(data);
                    })}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Pet's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="petType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Type</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full p-2 border rounded"
                              >
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Other">Other</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breed</FormLabel>
                          <FormControl>
                            <Input placeholder="Pet's breed" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Years"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="Kilograms"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Conditions</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {['Allergy', 'Arthritis', 'Diabetes', 'None'].map(
                                (condition) => (
                                  <label
                                    key={condition}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      value={condition}
                                      checked={(field.value || []).includes(
                                        condition
                                      )}
                                      onChange={(e) => {
                                        const currentValue = field.value || [];
                                        const newValue = e.target.checked
                                          ? [...currentValue, condition]
                                          : currentValue.filter(
                                              (c: string) => c !== condition
                                            );
                                        field.onChange(newValue);
                                      }}
                                    />
                                    <span>{condition}</span>
                                  </label>
                                )
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-4">
                      {['FEMALE', 'MALE'].map((gender) => (
                        <Button
                          key={gender}
                          type="button"
                          variant={
                            form.watch('genderType') === gender
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => form.setValue('genderType', gender)}
                        >
                          {gender}
                        </Button>
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: {} }) => (
                        // render={({ field: { value, ...fieldProps } }) => (

                        <FormItem>
                          <FormLabel>Upload Photo</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="w-full p-2 border rounded"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit">
                        {pet ? 'Update Pet' : 'Submit'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="healthRecord">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Health Record Request
                </h2>

                <Form {...healthRecordForm}>
                  <form
                    onSubmit={healthRecordForm.handleSubmit((data) => {
                      const finalData = { ...data };
                      if (
                        data.otherTreatment &&
                        data.otherTreatment.trim() !== ''
                      ) {
                        const treatmentsWithoutOtherPlaceholder =
                          data.pastTreatments.filter((t) => t !== 'Other');
                        if (
                          !treatmentsWithoutOtherPlaceholder.includes(
                            data.otherTreatment
                          )
                        ) {
                          finalData.pastTreatments = [
                            ...treatmentsWithoutOtherPlaceholder,
                            data.otherTreatment,
                          ];
                        } else {
                          finalData.pastTreatments =
                            treatmentsWithoutOtherPlaceholder;
                        }
                      } else {
                        finalData.pastTreatments = data.pastTreatments.filter(
                          (t) => t !== 'Other'
                        );
                      }

                      console.log('Submitted Health Record Data:', finalData);
                      if (onHealthRecordSubmit) {
                        onHealthRecordSubmit(finalData);
                      }
                    })}
                    className="space-y-6"
                  >
                 
                    <FormItem>
                      <FormLabel>Past Treatments</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {[...standardTreatments, 'Other'].map((treatment) => (
                            <label
                              key={treatment}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                value={treatment}
                                checked={
                                  treatment === 'Other'
                                    ? isOtherTreatmentSelected
                                    : (
                                        healthRecordForm.watch(
                                          'pastTreatments'
                                        ) || []
                                      ).includes(treatment)
                                }
                                onChange={(e) =>
                                  handleTreatmentChange(
                                    treatment,
                                    e.target.checked
                                  )
                                }
                              />
                              <span>{treatment}</span>
                            </label>
                          ))}
                          {isOtherTreatmentSelected && (
                            <div className="w-full mt-2">
                              <Input
                                placeholder="Specify other treatment"
                                value={
                                  healthRecordForm.watch('otherTreatment') || ''
                                }
                                onChange={handleOtherTreatmentChange}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel>Documents</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleDocumentsChange}
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      <div className="mt-2 space-y-1">
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm truncate max-w-xs">
                              {doc.name}
                            </span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveDocument(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </FormItem>

                    <div className="flex justify-end">
                      <Button type="submit">
                        {healthRecord
                          ? 'Update Health Record'
                          : 'Submit Health Record'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetRegistrationForm;



