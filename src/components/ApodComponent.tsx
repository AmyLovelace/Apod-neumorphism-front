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

  return (
    <div className="apod-component">
      
      <div className='apod-component__form-date-container'>
      <input 
        type="date"
        value={date}
        onChange={handleDateChange}
        placeholder="Introduce una fecha (YYYY-MM-DD)"
        className='apod-component__input'
      />
      <button onClick={fetchApod} className='apod-component__button'>Obtener APOD</button>
      </div>
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apodData && (
        <div className="apod-component__container">
          <img src={apodData.url} alt={apodData.title} className="apod-component__img" />
          <p className="apod-component__title">{apodData.title}</p>
          <p className="apod-component__explanation">{apodData.explanation}</p>
        </div>
      )}
    </div>
  );
};


export default ApodComponent;
