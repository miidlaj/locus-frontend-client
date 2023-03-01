import React from 'react'
import catergoryService from '../../../services/resort/catergory.service'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    categoryId: number;
    categoryHandler: (value: number) => void;
    categoryValidation: string
}
const Category = (props: Props) => {


    interface Category {
        id: number,
        name: string,
        description: string   
    }
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [errorMessage, setErrorMessage] = React.useState('');

    
    const handleChange = (event: SelectChangeEvent<number>) => {
      if (typeof event.target.value === 'string') {
        props.categoryHandler(parseInt(event.target.value));
      } else if (typeof event.target.value === 'number') {
        props.categoryHandler(event.target.value);
      }

      };
    

    React.useEffect(() => {
        catergoryService.getAllCategories()
        .then((response) => {
          console.log(response.data);
          setCategories(response.data)
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Unexpected error occurred.");
        }); 
      
      }, [])
      

  return (
  
    <div>
      <FormControl sx={{ m: 1, minWidth: 350 }} >
        <InputLabel id="demo-simple-select-helper-label">Cat</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.categoryId}
          label="Cat"
          onChange={handleChange}
        >
          <MenuItem value={0}>SELECT CATEGORY</MenuItem>

          {categories.map(category => (
          <MenuItem key={category?.id} value={category?.id}>
            {category?.name}
          </MenuItem>
        ))}

        </Select>
        {props.categoryValidation && (
          <span className="text-red-700 text-sm block mt-2">
            {props?.categoryValidation}
          </span>
        )}
        { errorMessage &&
        <p className='text-red-700 text-sm block mt-2'>{errorMessage}</p>
      }
      </FormControl>
      
    </div>
  )
}

export default Category