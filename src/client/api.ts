import axios, { AxiosError} from 'axios';
import ApodRes from '../interfaces/ApodRes';

const handleAxiosError = (error: AxiosError) => {
    console.error('Error fetching APOD data:', error);
  
    if (error.response) {
      console.error(`Error code: ${error.response.status}`);
      console.error(`Error message: ${error.response.data|| error.response.statusText}`);
    } else if (error.request) {
      console.error('Network error: No response from server.');
    } else {
      console.error('Error:', error.message);
    }
  
    return null; 
  };

export const fetchApodData = async (date: string): Promise<ApodRes|any> => {
  const url = `http://localhost:8080/api/v1/apod?date=${date}`;

  try {
          const response = await axios.get(url);
      
          const apodData: ApodRes = {
            url: response.data.url,
            title: response.data.title,
            explanation: response.data.explanation,
          };
      
        console.log(apodData)
        return apodData;
        } 
        catch (error) {
          handleAxiosError(error as AxiosError);
        }

}

