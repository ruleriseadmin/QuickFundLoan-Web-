//format currency to add a comma
const formatCurrency = (amount: number | null) => {
    if (amount === null) return '₦ 0';
    return '₦ ' + amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const options = [
    
    { value: "website", label: "Our Website", color: "#1C1C1E", fontSize: "16px" },
    { value: "instagram", label: "Instagram", color: "#1C1C1E", fontSize: "16px" },
    { value: "twitter", label: "Twitter", color: "#1C1C1E", fontSize: "16px" },
    { value: "facebook", label: "Facebook", color: "#1C1C1E", fontSize: "16px" },
    { value: "playstore", label: "Playstore Search", color: "#1C1C1E", fontSize: "16px" },
    { value: "applestore", label: "Applestore Search", color: "#1C1C1E", fontSize: "16px" },
    { value: "youtube", label: "YouTube", color: "#1C1C1E", fontSize: "16px" },
    { value: "outdoor_banner", label: "Outdoor Banner", color: "#1C1C1E", fontSize: "16px" },
    { value: "friend_referral", label: "Friend Referral", color: "#1C1C1E", fontSize: "16px" },
    { value: "via_sms", label: "Via SMS", color: "#1C1C1E", fontSize: "16px" },
    { value: "others", label: "Others", color: "#1C1C1E", fontSize: "16px" },
  ];

  const getFormattedDateTime = (): string => {
    const now = new Date();
  
    // Format date
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'long', // Full month name, e.g., October
      day: 'numeric', // Numeric day, e.g., 21
      year: 'numeric', // Full year, e.g., 2024
    });
  
    const formattedDate = dateFormatter.format(now);
  
    // Format time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Add leading zero
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 for midnight
  
    const formattedTime = `${hours}:${minutes}${ampm}`;
  
    return `${formattedDate} ${formattedTime}`;
  };
  const calculateDaysToDue = (dueDateString: string): number => {
    const now = new Date();
    const dueDate = new Date(dueDateString);
  
    // Calculate the difference in time (milliseconds)
    const diffInMilliseconds = dueDate.getTime() - now.getTime();
  
    // Convert milliseconds to days
    const days = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return formatter.format(date);
  };
  
const formatTime = (dateString: string): string => {
  if (!dateString) return '';
  const [hourStr, minute] = dateString.split(':');
  const hour = Number(hourStr);

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${minute} ${period}`;
};

  const formatDateLoan = (dateString: string): string => {
    const [datePart] = dateString.split(' '); // Extract the date portion
    const date = new Date(datePart); // Use the date portion
    if (isNaN(date.getTime())) {
      throw new RangeError('Invalid time value');
    }
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(date);
  };

  //get percentage
  const getPercentage = (amount: number, percentage: number): number => {
    
    return Math.ceil((percentage * 100) / amount);
};

  
  

export { formatCurrency, options, getPercentage,formatTime, getFormattedDateTime, calculateDaysToDue,formatDate,formatDateLoan };

