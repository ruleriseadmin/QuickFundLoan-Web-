'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/loading';
import apiClient from '@/utils/apiClient';
import Notification from '../Notification';
import { options } from '@/utils/bankFunctions';


type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  marital: string;
  employment: string;
  employer?: string;
  source: string;
  incomeLevel: string;
  education: string;
  dependents: number;
  fullName: string;
  kinNo: string;
};

type ProfileProps = {
  data: ProfileData | null;
};

const Profile: React.FC<ProfileProps> = ({ data }) => {


  const router = useRouter();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState("");
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [otherSource, setOtherSource] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [source, setSource] = useState('');

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSource(value);
    setShowOtherInput(value === 'others'); // Show input if "others" is selected
  
    // Update formData state for source
    setFormData((prevData) => ({
      ...prevData,
      source: value,
    }));
  
    if (value !== 'others') {
      setOtherSource('');
    }
  };
  


  //toggle notification
  const toggleNotification = () => {
      setNotificationOpen(!isNotificationOpen);
  }

  //toggle notification
  const toggleSuccessNotification = () => {
      setSuccessNotification(!successNotification);
  }


  const [formData, setFormData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phone: '',
    source: '',
    marital: '',
    employment: '',
    employer: '',
    incomeLevel: '',
    education: '',
    dependents: 0,
    fullName:'',
    kinNo:'',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        dob: data.dob || '',
        source:data.source || '',
        marital: data.marital || '',
        employment: data.employment || '',
        employer: data.employer || '',
        phone: data?.phone || '',
        incomeLevel: data.incomeLevel || '',
        education: data.education || '',
        dependents: data.dependents || 0,
        fullName: data.fullName || '',
        kinNo: data.kinNo || '',
      });
    }
  }, [data]);

 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await apiClient.post(`/profile`, 
        { first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          marital_status: formData.marital,
          employment_status: formData.employment,
          employer: formData.employer,
          phone_number: formData.phone,
          source : formData.source === 'others' ? otherSource : formData.source ,
          income_level: formData.incomeLevel,
          dependents: formData.dependents,
          educational_level: formData.education,
          next_of_kin_name: formData.fullName,
          next_of_kin_phone_number: formData.kinNo,
        });
      setSuccess(response?.data?.message || 'Profile updated successfully');
      setSuccessNotification(true);
     
       setLoading(false);
     } catch (error: any) {
       console.log(error.response);
       setError(error?.response?.data?.message || 'An error occurred, please try again');
      setNotificationOpen(true);
       setLoading(false);
     }
  }

  return (
    <div className="w-full h-auto font-outfit mt-10">
      <div className="bg-[#F1F1F1] w-11/12 lg:w-8/12 md:w-11/12 lg:ml-10 mx-auto h-auto p-4 rounded-[5px]">
        <form onSubmit={handleSubmit}>
        <div className="text-[#5A5A5A] flex justify-between align-middle items-center mb-10">
          <p className="text-[18px]">Account profile</p>
          <button
            className="flex justify-center disabled:opacity-50 items-center font-outfit rounded-full w-[140px] mt-2 bg-[#282828] text-[#ffff] h-[41px] py-1 px-4  transition-colors duration-300"
            type="submit"
            disabled={loading}
          >
            Save changes
          </button>
          {loading && <LoadingPage />}
        </div>

        <div className="grid lg:gap-4 md:gap-4 w-full grid-cols-1 gap-0 md:grid-cols-2">
          <div className="mb-4 ">
            <label htmlFor="firstName" className="text-[#5A5A5A] text-[15px] font-semibold">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>
          <div className="mb-6">
      <label htmlFor="source" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
        How did you hear about us
      </label>
      <select
        value={formData.source}
        disabled={data?.firstName === ''}
        onChange={handleSourceChange}
        className="relative custom-select bg-background disabled:bg-[#F5F5F5] border border-solid border-[#BEBEBE] w-full h-[55px] rounded-[8px] focus:ring-1 text-[#5A5A5A] focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
      >
        <option>{formData.source}</option>
        {options.map((option) => (
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
          onChange={(e) => setOtherSource(e.target.value)}
          className="bg-background border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
        />
      )}
    </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              disabled
              onChange={handleInputChange}
          
              className="bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>
          

          <div className="mb-4">
            <label htmlFor="email" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Dob
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              max={new Date().toISOString().split('T')[0]} // Sets the maximum date to today's date
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            >
            </input>
            
          </div>

          <div className="mb-4">
            <label htmlFor="marital" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Marital Status
            </label>
            <select
              name="marital"
              value={formData.marital}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            >
              <option value="" disabled>Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="employment" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Employment Status
            </label>
            <select
              name="employment"
              value={formData.employment}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            >
              <option value="" disabled>Employment Status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self employed</option>
              <option value="student">Student</option>
            </select>
          </div>

          {formData.employment === 'employed' && (
            <div className="mb-4">
              <label htmlFor="employer" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
                Employer
              </label>
              <input
                type="text"
                name="employer"
                placeholder="Employer Name"
                value={formData.employer || ''}
                
                onChange={handleInputChange}
                disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
              />
            </div>
          )}


          <div className="mb-4">
            <label htmlFor="incomeLevel" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Income Level
            </label>
            <select
              name="incomeLevel"
              value={formData.incomeLevel}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            >
              <option value="" disabled>Income Level</option>
              <option value="10000-20000">₦10,000 - ₦20,000</option>
              <option value="20001-50000">₦20,001 - ₦50,000</option>
              <option value="50001-100000">₦50,001 - ₦100,000</option>
              <option value="100001-200000">₦100,001 - ₦200,000</option>
              <option value="200001-500000">₦200,001 - ₦500,000</option>
              <option value="500001-1000000">₦500,001 - ₦1,000,000</option>
              <option value="1000000+">₦1,000,000+</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="education" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Education Level
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            >
              <option value="none">No Formal Education</option>
              <option value="primary">Primary School</option>
              <option value="secondary">Secondary School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">PhD or Higher</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dependents" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Number of Dependents
            </label>
            <input
              type="number"
              name="dependents"
              value={formData.dependents}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>
          <br />
          <div className='w-full  lg:col-span-2 md:col-span-2'>
          <p className='my-4 font-semibold text-[18px]  text-center'>NEXT OF KIN DETAILS</p>
          
          <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2'>
          <div className="mb-4">
            <label htmlFor="fullName" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kinNo" className="text-[#5A5A5A] text-[15px] font-semibold ml-6">
              Phone number
            </label>
            <input
              type="text"
              name="kinNo"
              placeholder="phone number"
              value={formData.kinNo}
              onChange={handleInputChange}
              disabled={data?.firstName === ''}
              className="bg-background disabled:bg-[#F5F5F5]  border-2 border-solid text-[#5A5A5A] border-[#BEBEBE] w-full h-[58px] rounded-[8px] focus:ring-1 focus:ring-[#BEBEBE] focus:outline-none px-4 py-2 mt-2"
            />

          </div>
            
          </div>

          </div>
          
         
          
        
         
         
        </div>
        </form>
        {isNotificationOpen && (
         <Notification
         isOpen={isNotificationOpen}
         toggleNotification={toggleNotification}
         status='error'
         
         message={error || 'An error occurred, please try again'}
       />
       )}
       {successNotification && (
         <Notification
         isOpen={successNotification}
         toggleNotification={toggleSuccessNotification}
         status='success'
         title='Success!'
         message={success }
        />
       )}
      </div>
    </div>
  );
};

export default Profile;
