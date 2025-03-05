'use client';

import { useDoctorStore } from '@/store/doctorStore';
import { format } from 'date-fns';
import { ArrowRight, Loader, LucideLoader2 } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { COLORS } from '../constants/color';
import DoctorsCard from '@/components/Doctor/DoctorsCard';
import { getDoctorData } from '@/api/Doctor/route';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import NotFound from '@/components/NotFound';
import { useSpecializationStore } from '@/store/specializationStore';
import { Specialization } from '@/lib/typings';
import { useCityStore } from '@/store/cityStore';
import { usePetStore } from '@/store/petStore';
import { useAuthStore } from '@/store/authStore';
import { getPetFilterData } from '@/api/Pet/route';

// interface Doctor {
//   preSignedUrl: string;
//   image: string;
//   name: string;
//   description: string;
// }

const Doctors = () => {
  const searchParams = useSearchParams();
  const searchParamsspecializationId = searchParams.get('specializationId');
  const searchParamsdate = searchParams.get('date');
  const searchParamscityId = searchParams.get('cityId');
  const [docName, setDocName] = useState<string | null>(null);
  const [doctorType, setDoctorType] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    searchParams.get('date')
  );
  const [specialization, setSpecialization] = useState<string | null>(
    searchParams.get('specializationId')
  );
  const { login } = useAuthStore((state) => state);
  const [city, setCity] = useState<string | null>(searchParams.get('cityId'));
  const [medium, setMedium] = useState<string | null>(
    searchParams.get('medium') || null
  );
  const allDoctors = useDoctorStore((state) => state.doctors);
  const setAllDoctors = useDoctorStore((state) => state.setAllDoctors);
  const { setFilteredPets } = usePetStore((state) => state);
  const loading = useDoctorStore((state) => state.loading);
  const setLoading = useDoctorStore((state) => state.setLoading);
  const specializations = useSpecializationStore(
    (state: { specialization: Specialization[] }) => state.specialization
  );
  const filterallcities = useCityStore((state) => state.filterallcities);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (selectedDay||doctorType||docName) {
  //     handleFilterClick();
  //   }
  // });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const filterResponse = await getDoctorData(
          1,
          10,
          true,
          searchParamsspecializationId
            ? searchParamsspecializationId
            : undefined,
          searchParamsdate
            ? format(new Date(searchParamsdate), 'yyyy-MM-dd')
            : undefined,
          searchParamscityId ? searchParamscityId : undefined
        );
        if (login) {
          const res = await getPetFilterData({
            pageSize: 10,
            pageCount: 1,
            userId: Number(login?.userId),
          });

          if (res?.records) {
            setFilteredPets(res.records);
          }
        }
        console.log('🚀 ~ fetchDoctors ~ filterResponse:', filterResponse);
        setAllDoctors(filterResponse?.records || []);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };

    // if (searchParamsspecializationId || searchParamsdate) {
    fetchDoctors();
    // }
  }, [ login,
    searchParamscityId,
    searchParamsdate,
    searchParamsspecializationId,
    setFilteredPets,
    setAllDoctors,
    setLoading,]);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const petData = await getPetData();
  //     const departmentData = await getDepartmentData();
  //     const specializations = await getAllspecialization(1, 10);
  //     setAllPets(petData);
  //     setAllDepartments(departmentData);
  //     setAllSpecialization(specializations);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFilterClick = useCallback(() => {
    const debouncedFilter = debounce(async () => {
      try {
        console.log(
          'first',
          specialization,
          searchParamsdate,
          city,
          docName,
          doctorType,
          selectedDay,
          medium
        );
        setLoading(true);
        const filterResponse = await getDoctorData(
          1,
          10,
          true,
          specialization || undefined,
          selectedDate || undefined,
          city || undefined,
          docName || undefined,
          doctorType || undefined,
          selectedDay || undefined,
          medium || undefined
        );
        console.log('🚀 ~ debouncedFilter ~ filterResponse:', filterResponse);
        setAllDoctors(filterResponse?.records || []);
      } catch (error) {
        console.log('Error:', error);
        toast.error('Error fetching filtered data');
      } finally {
        setLoading(false);
      }
    }, 500);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [
    searchParamsdate,
    selectedDate,
    setLoading,
    setAllDoctors,
    docName,
    doctorType,
    selectedDay,
    medium,
    specialization,
    city,
  ]);

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setDocName(null);
    }
    setDocName(e.target.value);
  };

  const handleMediumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'all') {
      setMedium('');
      return;
    }
    setMedium(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'all') {
      setCity(null);
      return;
    }
    setCity(e.target.value);
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log('🚀 ~ Doctors ~ e:', e.target.value);
    if (e.target.value === '') {
      setSpecialization(null);
      return;
    }
    setSpecialization(e.target.value);
  };

  const handleDoctorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setDoctorType(null);
    }
    setDoctorType(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loader className="h-10 w-10" />
  //     </div>
  //   );
  // }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setSelectedDate(inputDate);
  };

  return (
    <div className="py-8 w-full container pt-20 pb-20 h-full flex flex-col gap-2 px-0 md:px-7 mx-auto">
      <div className="bg-white rounded-lg mt-10 shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Doctor Name Search */}
          <input
            type="text"
            placeholder="Search doctors"
            value={docName!}
            onChange={handleDocNameChange}
            className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 md:col-span-2"
          />
          <div className="relative">
            <select
              value={doctorType!}
              onChange={handleDoctorTypeChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option value="">select doctor type</option>
              <option value="GENERAL">General</option>
              <option value="SPECIALIST">Specialist</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={specialization!}
              // defaultValue={specialization!}
              onChange={handleSpecializationChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option value="">select Specialization</option>
              {specializations?.map((specialization) => (
                <option key={specialization.id} value={specialization.id}>
                  {specialization?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="date"
              placeholder="Select Date"
              value={selectedDate!}
              onChange={handleDateChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 md:col-span-2"
            />
          </div>
          <div className="relative">
            <select
              value={city!}
              // defaultValue={city!}
              onChange={handleCityChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option value="all">select City</option>
              {filterallcities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={medium!}
              // defaultValue={medium}
              onChange={handleMediumChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option value="">select Appointment Medium</option>
              <option value="PHYSICAL">Physical</option>
              <option value="VIRTUAL">Virtual</option>
            </select>
          </div>

          {/* Day Dropdown */}
          <div className="relative">
            <select
              value={selectedDay!}
              onChange={handleDayChange}
              className="block w-full px-3 py-2 border rounded-md focus:ring-indigo-500"
            >
              <option className="text-gray-300" value="">
                Select a day
              </option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>
          <div className=" md:col-span-4"></div>

          {/* Search Button */}
          <button
            onClick={handleFilterClick} // Assuming handleFilterClick filters based on the selected values
            className={`flex items-center justify-center group ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
          >
            {loading ? (
              <LucideLoader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <>
                Search
                <ArrowRight
                  className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                  size={20}
                />
              </>
            )}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex-grow w-full flex items-center justify-center">
          <Loader className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div>
          {allDoctors && allDoctors.length > 0 ? (
            <DoctorsCard
              title="Popular Doctors"
              description="Meet With Professional Doctors."
              doctors={allDoctors}
            />
          ) : (
            <div className="justify-center items-center align-middle">
              <NotFound name="Doctors" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctors;
