import React, { useState, useEffect } from 'react';
import  ApodRes from '../interfaces/ApodRes'; 
import { fetchApodData } from '../client/api';
import '../atoms/apod.component.scss'


const ApodComponent = () => {
  const [date, setDate] = useState('');
  const [apodData, setApodData] = useState<ApodRes | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const fetchApod = async () => {
    if (!date) {
      setError('Por favor, introduce una fecha.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchApodData(date)
      const apodData: ApodRes = response;

      setApodData(apodData);
      
    } catch (error:any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [date]);
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month: string | number = now.getMonth() + 1;
    let day: string | number = now.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };


  return (
    
    <div className="apod-component">
      
      <div className='apod-component__form-date-container'>
      <input 
        type="date"
        value={date}
        onChange={handleDateChange}
        min="1995-06-16" 
        max={getCurrentDate()} 
        placeholder="Introduce una fecha (YYYY-MM-DD)"
        className='apod-component__input'
      />
      <button onClick={fetchApod} className='apod-component__button'>Get Picture</button>
      </div>
      {isLoading && <p className='apod-component__text'>Cargando...</p>}
      {error && <p className='apod-component__text'>{error}</p>}
      {apodData && (
        <div className="apod-component__container">
          <img src={apodData.url} alt={apodData.title} className="apod-component__img" />
          <div className='apod-component__card'>
          <p className="apod-component__title">{apodData.title}</p>
          <p className="apod-component__explanation">{apodData.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default ApodComponent;
