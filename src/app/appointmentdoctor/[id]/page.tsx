'use client';
import BookingForm from '@/components/booking';

const Index = ({ params }: { params: Promise<{ id: string }> }) => {
  console.log("object",params)
  return (
    <>
      <div className="py-8 w-full container align-middle pt-20 pb-20 px-0 md:px-7 mx-auto">
        <BookingForm />
      </div>
    </>
  );
};

export default Index;
