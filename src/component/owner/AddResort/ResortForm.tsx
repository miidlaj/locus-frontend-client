import React, { useState } from 'react';
import Overview from './Overview';
import Description from './Description';
import FacilitySelection from './FacilitySelection';
import Address from './Address';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import resortService from '../../../services/resort/resort.service';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  resortName: string,
  description: string,
  categoryId: number,
  facilityIds: number[],
  zipCode: string,
  city: string,
  state: string,
  country: string,
  userId: number;
}

const ResortForm = () => {

  const currentUser = useSelector((state: RootState) => state.user);
  const userId = parseInt(currentUser.id);

  const [errorMessage, setErrorMessage] = React.useState('')

  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<FormValues>({
    resortName: '',
    description: '',
    categoryId: 0,
    facilityIds: [],
    zipCode: '',
    city: '',
    state: '',
    country: '',
    userId: userId,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const categoryHandler = (value:number) => {
    console.log(value);
    
    setFormValues(prevState => ({
      ...prevState,
      categoryId: value
    }));
  }
  
  const facilityHandler = (val: number[]) => {
    setFormValues(prevState => ({
      ...prevState,
      facilityIds : val
    }));
  }

  const descriptionHandler = (value:string) => {
    setFormValues(prevState => ({
      ...prevState,
      description : value
    }));    
  }

  const nextStep = () => {
    setStep(prevState => prevState + 1);
  };

  const prevStep = () => {
    setStep(prevState => prevState - 1);
  };
  
  const navigate = useNavigate();
  const submitForm = () => {
    resortService.createNewRersort(formValues)
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) navigate('/resorts/new/1')

    })
    .catch((error) => {
      console.log(error);
      setErrorMessage("Unexpected error occurred.");
    });
  };


  

  switch (step) {
    case 1:
      return (
        <Overview
          resortName={formValues.resortName}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Description
          categoryId={formValues.categoryId}
          description={formValues.description}
          descriptionHandler={descriptionHandler}
          categoryHandler={categoryHandler}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <FacilitySelection
          facilityIds={formValues.facilityIds}
          facilityHandler={facilityHandler}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 4:
      return <Address 
          zipCode={formValues.zipCode}
          city={formValues.city}
          state={formValues.state}
          country={formValues.country}
          submitForm={submitForm}
          handleChange={handleChange}
          prevStep={prevStep}

      />;
    default:
      return null;
  }
}

export default ResortForm;
