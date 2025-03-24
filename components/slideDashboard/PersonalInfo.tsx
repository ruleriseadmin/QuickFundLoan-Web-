import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingPage from '@/app/loading';
import { useRouter } from 'next/navigation';
import { FaLock } from "react-icons/fa";
import apiClient from '@/utils/apiClient';
import {options} from '@/utils/bankFunctions'



type PersonalInfoProps = {
  handleCard: () => void;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ handleCard }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [marital, setMarital] = useState<string>('');
  const [employment, setEmployment] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [dependents, setDependents] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [kinNo, setKinNo] = useState<string>('');
  const [nin, setNIN] = useState<string>('');
  const router = useRouter();
  const [otherSource, setOtherSource] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [source, setSource] = useState('');
  
    const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSource(value);
      setShowOtherInput(value === 'others'); // Show input if "others" is selected
      if (value !== 'others') {
        setOtherSource(''); 
      }
    };

  


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post(`/profile`, 
        { first_name: firstName,
          last_name: lastName,
          email: email,
          nin: nin,
          dob: dob,
          marital_status: marital,
          employment_status: employment,
          next_of_kin_name: fullName,
          next_of_kin_phone_number: kinNo,
          employer: employer,
          income_level: income,
          source:source === 'others' ? otherSource : source,
          dependents: dependents,
          educational_level: education,
        });
      handleCard(); 
      setLoading(false);
    } catch (error: any) {
      console.log(error.response);
      const url = `/dashboard?status=${encodeURIComponent('error')}&message=${encodeURIComponent(error?.response?.data?.message ||  'An error occurred, please try again')}`;
      router.push(url);
      setLoading(false);
    }
  }

  
  return (
    <div className='w-full mx-auto font-outfit font-normal'>
     
       
        <p className=' text-[#C03636] text-[18px] p-2  font-semibold mt-2'>
        We make loan eligibility decision based on the information you provide to us.
         Please ensure you are providing the right details.
        </p>

      <form className="my-6 grid grid-cols-2 gap-4 " onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div className="mb-4 relative">
  <label htmlFor="firstName" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    First Name <span className="text-[#ED3237]">*</span>
  </label>
  <div className="relative mt-2">
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
      className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] disabled:cursor-not-allowed border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
      
    />
  </div>
</div>


        {/* Last Name Field */}
        <div className="mb-4 relative">
          <label htmlFor="lastName" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            Last Name <span className='text-[#ED3237]'>*</span>
          </label>
          <div className="relative mt-2">
    <input
      type="text"
      value={lastName}
      required
      onChange={(e) => setLastName(e.target.value)}
      className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] disabled:cursor-not-allowed border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
    />
  </div>
        </div>
       


       {/* Marital Status Field */}
       <div className="col-span-1 mb-4">
          <label htmlFor="marital" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            Marital Status <span className='text-[#ED3237]'>*</span>
          </label>
          <select
            value={marital}
            onChange={(e) => setMarital(e.target.value)}
            className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            required
          >
            <option value="" disabled>Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>


    {/* Dependents Field */}
<div className="col-span-1 mb-4 relative">
  <label htmlFor="dependents" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Dependents <span className="text-[#ED3237]">*</span>
  </label>
  <select
    value={dependents}
    onChange={(e) => setDependents(e.target.value)}
   className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
    required
  >
    <option value="" disabled>Select dependents</option>
    {Array.from({ length: 11 }, (_, index) => (
      <option key={index} value={index}>{index}</option>
    ))}
  </select>
</div>

{/* Date of Birth Field */}
<div className="mb-4 relative col-span-2">
  <label htmlFor="dob" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Date of Birth <span className='text-[#ED3237]'>*</span>
  </label>
  <div className="relative mt-2">
    <input
      type="date"
      value={dob}
      required
      onChange={(e) => setDob(e.target.value)}
      max={new Date().toISOString().split('T')[0]} // Sets the maximum date to today's date
      className="bg-[#F5F5F5] border-2 border-solid disabled:cursor-not-allowed text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
    />
  </div>
</div>

        
{/* Educational Level Field */}
<div className="col-span-2 mb-4">
  <label htmlFor="education" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Educational Level <span className="text-[#ED3237]">*</span>
  </label>
  <select
    value={education}
    onChange={(e) => setEducation(e.target.value)}
    className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
    required
  >
    <option value="" disabled>Select your educational level</option>
    <option value="none">No Formal Education</option>
    <option value="primary">Primary School</option>
    <option value="secondary">Secondary School</option>
    <option value="diploma">Diploma</option>
    <option value="bachelors">Bachelor's Degree</option>
    <option value="masters">Master's Degree</option>
    <option value="phd">PhD or Higher</option>
  </select>
</div>
        {/* Email Address Field */}

 <div className="mb-4 relative col-span-2">
          <label htmlFor="email" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            Email <span className='text-[#ED3237]'>*</span>
          </label>
          <div className="relative mt-2">
    <input
      type="email"
      value={email}
      required
      className="bg-[#F5F5F5] border-2 text-[#5A5A5A] border-solid disabled:cursor-not-allowed border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your address"
    />
   
  </div>
        </div>



<div className="col-span-2 mb-4">
<label htmlFor="employer" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Employment Status <span className='text-[#ED3237]'>*</span> 
  </label>
            <select
              name="employment"
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
             required
              className="bg-[#F5F5F5] text-[#5A5A5A] border-2 border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE]  focus:outline-none px-4 py-2 mt-2"
            >
              <option value="" disabled>Choose employment status</option>
              <option value="employed">Employed </option>
              <option value="self-employed">Self employed</option>
              <option value="student">Student</option>
            </select>
</div>
{employment === 'employed' && (
  <div className="col-span-2 mb-4">
  <label htmlFor="employer" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Employer <span className='text-[#ED3237]'>*</span> 
  </label>
  <input
    type="text"
    value={employer}
    required
    onChange={(e) => setEmployer(e.target.value)}
    className="bg-[#F5F5F5] border-2 text-[#5A5A5A] border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE]  focus:outline-none px-4 py-2 mt-2"
    placeholder="Employer name"
    
  />
</div>
   

)}
   
 {/* Income Level Field */}
 <div className="col-span-2 mb-4">
  <label htmlFor="income" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
    Income Level <span className="text-[#ED3237]">*</span>
  </label>
  <select
    value={income}
    onChange={(e) => setIncome(e.target.value)}
    className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
    required
  >
    <option value="">Select Income Level</option>
    <option value="10000-20000">₦10,000 - ₦20,000</option>
    <option value="20001-50000">₦20,001 - ₦50,000</option>
    <option value="50001-100000">₦50,001 - ₦100,000</option>
    <option value="100001-200000">₦100,001 - ₦200,000</option>
    <option value="200001-500000">₦200,001 - ₦500,000</option>
    <option value="500001-1000000">₦500,001 - ₦1,000,000</option>
    <option value="1000000+">₦1,000,000+</option>
  </select>
</div>

         {/* NIN */}
         <div className="col-span-2 mb-4">
          <label htmlFor="address" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            NIN(National Identity Number)
          </label>
          <input
            type="text"
            value={nin}
            onChange={(e) => setNIN(e.target.value)}
            className="bg-[#F5F5F5] border-2 text-[#5A5A5A] border-solid border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            
           
          />
        </div>

        {/* Source of Income Field */}
        <div className="mb-6 col-span-2">
      <label htmlFor="source" className="text-[#5A5A5A] text-[15px] font-semibold ml-2">
        How did you hear about us<span className='text-[#ED3237]'>*</span> 
      </label>
      <select
        value={source}
        onChange={handleSourceChange}
        required
        className="relative custom-select bg-background disabled:bg-[#F5F5F5] border border-solid border-[#BEBEBE] w-full h-[55px] rounded-[8px] focus:ring-1 text-[#5A5A5A] focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
      >
        <option value="">Select Source</option>
        {options.map((option:any) => (
          <option
            key={option.value}
            value={option.value}
            style={{ color: option.color, fontSize: option.fontSize }}
          >
            {option.label}
          </option>
        ))}
      </select>
      {showOtherInput && (
        <input
          type="text"
          name="otherSource"
          placeholder="Please specify"
          value={otherSource}
          required
          onChange={(e) => 
            setOtherSource(e.target.value)}
          className="bg-background border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
        />
      )}
    </div>

    <p className='my-4 font-semibold text-[18px]'>NEXT OF KIN DETAILS</p>
       {/* Full Name Field */}
       <div className="mb-4 relative col-span-2">
          <label htmlFor="fullName" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            Full Name <span className='text-[#ED3237]'>*</span>
          </label>
          <div className="relative mt-2">
    <input
      type="text"
      value={fullName}
      required
      onChange={(e) => setFullName(e.target.value)}
      className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] disabled:cursor-not-allowed border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
    />
  </div>
        </div>
    {/* Kin mobile Field */}
    <div className="mb-4 relative col-span-2">
          <label htmlFor="kinNo" className="text-[#5A5A5A] text-[15px] font-semibold lg:ml-2 md:ml-4">
            Phone Number <span className='text-[#ED3237]'>*</span>
          </label>
          <div className="relative mt-2">
    <input
      type="text"
      value={kinNo}
      onChange={(e) => setKinNo(e.target.value)}
      required
      className="bg-[#F5F5F5] border-2 border-solid text-[#5A5A5A] disabled:cursor-not-allowed border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 pr-12 py-2"
    />
  </div>
        </div>


        <button 
        type='submit'
         disabled ={loading || !firstName || !lastName || !email || !marital || !dob || !dependents || !education || !employment || !income || !source}
        className="bg-[#1C1C1E] disabled:opacity-50 disabled:cursor-not-allowed col-span-2 text-white h-[47px] w-full rounded-[8px] px-4 py-2 mt-2 font-semibold">
          Let's finish up
        </button>
        {loading && <LoadingPage />}
      </form>
    </div>
  );
};

export default PersonalInfo;
