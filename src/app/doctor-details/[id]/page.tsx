// 'use client';
// import { getDoctorById } from '@/api/Doctor/route';
// import { getPetFilterData } from '@/api/Pet/route';
// import DoctorDetails from '@/components/Doctor/DoctorDetails';
// import { useAuthStore } from '@/store/authStore';
// import { useDoctorStore } from '@/store/doctorStore';
// import { usePetStore } from '@/store/petStore';
// import { use, useCallback, useEffect, } from 'react';

// const Index = ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = use(params);
//   const selectedDoctor = useDoctorStore((state) => state.selectedDoctor);
//   const setSelectedDoctor = useDoctorStore((state) => state.setSelectedDoctor);
//   const loading = useDoctorStore((state) => state.loading);
//   const login = useAuthStore((state) => state.login);
//   const filteredPets = usePetStore((state) => state.filteredPets);
//   const setFilteredPets = usePetStore((state) => state.setFilteredPets);
//   const isLoggedIn = !!login?.userId;
//   const fetchData = useCallback(async () => {
//     if (!id) return;
//     try {
//       const response = await getDoctorById(id);
//       if (response) {
//         setSelectedDoctor(response);
//       } else {
//         console.error('Doctor not found');
//       }
//     } catch (error) {
//       console.error('Error fetching doctor by ID:', error);
//     }
//   }, [id, setSelectedDoctor]);

//   const getAppointmentDetails = useCallback(async () => {
//     try {
//       const filterAppointmentList = await getPetFilterData({
//         pageSize: 10,
//         pageCount: 1,
//         userId: Number(login?.userId),
//       });

//       if (filterAppointmentList?.records) {
//         setFilteredPets(filterAppointmentList.records);
//       }
//     } catch (error) {
//       console.error('Error fetching hospital data:', error);
//     }
//   }, [login?.userId, setFilteredPets]);

//   useEffect(() => {
//     getAppointmentDetails();
//   }, [getAppointmentDetails]);

//   useEffect(() => {
//     if (id) {
//       fetchData();
//     }
//   }, [id, fetchData]);
//   console.log('objeselectedDoctorct', selectedDoctor);
//   return (
//     <>
//       <div className="container mt-16 mx-auto my-8">
//         {loading ? (
//           <div>Loading...</div>
//         ) : selectedDoctor ? (
//           <DoctorDetails
//             doctor={selectedDoctor}
//             filteredPets={filteredPets}
//             isLoggedIn={isLoggedIn}
//           />
//         ) : (
//           <div>Doctor not found.</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;

'use client';
import { getDoctorById } from '@/api/Doctor/route';
import { getPetFilterData } from '@/api/Pet/route';
import DoctorDetails from '@/components/Doctor/DoctorDetails';
import { useAuthStore } from '@/store/authStore';
import { useDoctorStore } from '@/store/doctorStore';
import { usePetStore } from '@/store/petStore';
import { useCallback, useEffect } from 'react';



const Index = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const selectedDoctor = useDoctorStore((state) => state.selectedDoctor);
  const setSelectedDoctor = useDoctorStore((state) => state.setSelectedDoctor);
  const loading = useDoctorStore((state) => state.loading);
  const login = useAuthStore((state) => state.login);
  const filteredPets = usePetStore((state) => state.filteredPets);
  const setFilteredPets = usePetStore((state) => state.setFilteredPets);
  const isLoggedIn = !!login?.userId;

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getDoctorById(id);
      if (response) {
        setSelectedDoctor(response);
      } else {
        console.error('Doctor not found');
      }
    } catch (error) {
      console.error('Error fetching doctor by ID:', error);
    }
  }, [id, setSelectedDoctor]);

  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getPetFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: Number(login?.userId),
      });

      if (filterAppointmentList?.records) {
        setFilteredPets(filterAppointmentList.records);
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setFilteredPets]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  return (
    <div className="container mt-16 mx-auto my-8">
      {loading ? (
        <div>Loading...</div>
      ) : selectedDoctor ? (
        <DoctorDetails
          doctor={selectedDoctor||null}
          filteredPets={filteredPets}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <div>Doctor not found.</div>
      )}
    </div>
  );
};

export default Index;
