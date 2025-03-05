"use client";

import React, { useState } from "react";
import Image from "next/image";
import petImage from "../../../public/images/banner.png";
import InfiniteScrollPartners from "../InfiniteScrollPartners/InfiniteScrollPartners";
import Awspng from "../../../public/images/aws.png";
import candapng from "../../../public/images/canda.png";
import Dmzpng from "../../../public/images/dmz.png";
import Nvidiapng from "../../../public/images/nvidia.png";
import Tbdcpng from "../../../public/images/tbdc.png";
import Tmupng from "../../../public/images/tmu.png";
import Torontopng from "../../../public/images/toronto.png";
import Tvzpng from "../../../public/images/tvz.png";
import { Calendar, LocateIcon, Search, Stethoscope } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { City, Specialization } from "@/lib/typings";
import { useSpecializationStore } from "@/store/specializationStore";
import { useCityStore } from "@/store/cityStore";
import { useRouter } from "next/navigation";

const PetCareSection = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [city, setCity] = useState<City | null>(null);
  const [openCity, setOpenCity] = useState(false);
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState<string | null>(null);
  const [mediumOpen, setMediumOpen] = useState(false);
  const specialization = useSpecializationStore(
    (state: { specialization: Specialization[] }) => state.specialization
  );
  const filterallcities = useCityStore((state) => state.filterallcities);
  const setSelectedCity = useCityStore((state) => state.setSelectedCity);
  const [selectedSpecialty, setSelectedSpecialty] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: Specialization) => ({
        label: special.name,
        value: special.id,
      }))
    : [];
  const partners = [
    { name: "AWS", image: Awspng, alt: "AWS Logo" },
    { name: "Canada", image: candapng, alt: "Canada Logo" },
    { name: "DMZ", image: Dmzpng, alt: "DMZ Logo" },
    { name: "NVIDIA", image: Nvidiapng, alt: "NVIDIA Logo" },
    { name: "TBDC", image: Tbdcpng, alt: "TBDC Logo" },
    { name: "TMU", image: Tmupng, alt: "TMU Logo" },
    { name: "Toronto", image: Torontopng, alt: "Toronto Logo" },
    { name: "TVZ", image: Tvzpng, alt: "TVZ Logo" },
  ];
  const handleFindDoctor = () => {
    const query = new URLSearchParams();
    if (selectedSpecialty?.id)
      query.append("specializationId", selectedSpecialty.id.toString());
    if (date) query.append("date", date.toISOString().split("T")[0]);
    if (city?.id) query.append("cityId", city.id.toString());
    if(selectedMedium) query.append("medium", selectedMedium);
    // if (date || city?.id || selectedSpecialty?.id) {
    router.push(`/doctors?${query.toString()}`);
    // } else {
    //   toast.error('Please select at least one filter before searching.');
    // }
  };

  const handleCitySelect = (selectedCity: { id: number; name: string }) => {
    setOpenCity(false);
    setCity(selectedCity);
    setSelectedCity(selectedCity);
  };

  const handleMediumSelect = (medium: string) => {
    setMediumOpen(!mediumOpen);
    if (!selectedMedium || medium !== selectedMedium) {
      setSelectedMedium(medium);
    } else {
      setSelectedMedium(null);
    }
  };

  const handleSpecialtySelect = (value: number, label: string) => {
    setOpenSpecialty(false);
    setSelectedSpecialty({ id: value, name: label });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto">
        <section className="flex flex-col gap-y-20">
          <div
            className="flex flex-row min-h-[100dvh] flex-wrap md:flex-row items-center justify-between p-6 flex-1 bg-cover bg-center"
            style={{ backgroundImage: "url('/svg/Group21.svg')" }}
          >
            <div className="flex flex-col pt-32 space-y-4 max-w-xl mx-auto basis-1/2">
              <h1 className="text-3xl md:text-5xl text-black font-bold tracking-tight">
                AI-Powered Pet Health &
              </h1>
              <h1 className="text-3xl md:text-5xl text-black font-bold tracking-tight">
                Wellness, Anytime,
              </h1>
              <h1 className="text-3xl md:text-5xl text-black font-bold tracking-tight">
                Anywhere!
              </h1>

              <p className="text-black font-normal pt-4 text-lg space-y-3">
                Scan, analyze, and consult with top veterinarians in real-time.{" "}
                <br />
                Early detection for a healthier, happier pet.
              </p>

              <div className="flex gap-4 pt-4 ">
                <button className="text-white py-3 rounded-lg w-52 flex items-center text-center justify-center bg-primary">
                  Explore PAWPOD
                </button>

                <button className="py-3 rounded-lg flex items-center w-52 border-primary text-center justify-center border text-primary">
                  Try the App for Free
                </button>
              </div>
              <div className="flex p-8 justify-center align-middle gap-10">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-black">100+</h2>
                  <p className="text-black text-xs">Treated Pets</p>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-black">97%</h2>
                  <p className="text-black text-xs">Accuracy Rate</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 self-end basis-1/2 -mb-20">
              <Image
                src={petImage}
                alt="Veterinary professional hugging a happy cream-colored dog"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="self-center mx-auto bg-white md:bg-white/70 border border-[#B2B2B2] rounded-full items-center text-[#919191] flex flex-row overflow-hidden">
              <div className="flex flex-row gap-x-3 justify-center basis-1/3 items-center p-4 ml-4">
                <Popover open={mediumOpen} onOpenChange={setMediumOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row gap-x-3 items-center cursor-pointer">
                      <Stethoscope size={22} color="#05c1af" />
                      <p className="text-xs font-medium">
                        {selectedMedium ? selectedMedium.charAt(0).toUpperCase() + selectedMedium.slice(1).toLowerCase() : "Medium"}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      <button
                        className={`w-full px-4 py-2 text-left ${
                          selectedMedium === "VIRTUAL"
                            ? "bg-[#05c1af] text-white"
                            : ""
                        } hover:bg-[#05c1af] cursor-pointer transition-colors text-sm`}
                        // onClick={() => setSelectedSpecialty(option.label)}
                        onClick={() => handleMediumSelect("VIRTUAL")}
                      >
                        Virtual
                      </button>
                      <button
                        className={`w-full px-4 py-2 text-left ${
                          selectedMedium === "PHYSICAL"
                            ? "bg-[#05c1af] text-white"
                            : ""
                        } hover:bg-[#05c1af] cursor-pointer transition-colors text-sm`}
                        // onClick={() => setSelectedSpecialty(option.label)}
                        onClick={() => handleMediumSelect("PHYSICAL")}
                      >
                        Physical
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="h-6 bg-gray-300 w-0.5" />
              <div className="flex flex-row gap-x-3 justify-center basis-1/3 items-center p-4 ml-4">
                <Popover open={openSpecialty} onOpenChange={setOpenSpecialty}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row gap-x-3 items-center cursor-pointer">
                      <Stethoscope size={22} color="#05c1af" />
                      <p className="text-xs font-medium">
                        {selectedSpecialty?.name || "Specialty"}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {specializationOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`w-full px-4 py-2 text-left hover:bg-[#05c1af] cursor-pointer transition-colors text-sm`}
                          // onClick={() => setSelectedSpecialty(option.label)}
                          onClick={() =>
                            handleSpecialtySelect(option.value, option.label)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="h-6 bg-gray-300 w-0.5" />
              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <div className="flex flex-row gap-x-3 items-center p-6 basis-1/3 justify-center cursor-pointer">
                    <Calendar size={22} color="#05c1af" />
                    <p className="text-xs font-medium">
                      {date ? date.toISOString().split("T")[0] : "Date"}
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    // onSelect/={setDate}
                    initialFocus
                    onSelect={handleDateSelect}
                  />
                </PopoverContent>
              </Popover>

              <div className="h-6 bg-gray-300 w-0.5" />
              <div className="flex flex-row gap-x-3 items-center p-6 basis-1/3 justify-center">
                <Popover open={openCity} onOpenChange={setOpenCity}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row gap-x-3 items-center basis-1/2 justify-center cursor-pointer">
                      <LocateIcon size={22} color="#05c1af" />
                      <p className="text-xs font-medium">
                        {city?.name ? city?.name : "Location"}
                      </p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {filterallcities.map((city: City) => (
                        <div key={city.id} className="flex flex-col">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-[#05c1af] cursor-pointer transition-colors text-sm"
                            onClick={() => handleCitySelect(city)}
                          >
                            {city.name}
                          </button>
                          {/* {index !== filterallcities.length - 1 && (
                            <div className="bg-red-800 border bottom-0 w-auto" />
                          )} */}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <button
                className="text-white py-8 px-3 md:px-6 text-xs md:text-sm flex items-center bg-primary flex-grow basis-1/3 gap-x-2 h-full rounded-full justify-center"
                onClick={handleFindDoctor}
              >
                <Search className="size-4 md:size-6" color="#fff" />
                <p className="text-nowrap">Find Doctor</p>
              </button>
            </div>
          </div>

          <div className="">
            <InfiniteScrollPartners partners={partners} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetCareSection;
