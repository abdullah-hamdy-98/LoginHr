import React from 'react';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Define the type for options
interface Option {
    id: number;
    label: string;
}

const options: Option[] = [
    { id: 0, label: 'Select All Employees' },
    { id: 1, label: 'Abdullah Hamdy' },
    { id: 2, label: 'Ibrahim Farag' },
    { id: 3, label: 'Muhammed Musallam' }
];

const gridOptions: Option[] = [
    { id: 0, label: 'Select All Columns' },
    { id: 1, label: 'Employee Picture' },
    { id: 2, label: 'Name Arabic' },
    { id: 3, label: 'Name English' },
    { id: 4, label: 'Job' },
    { id: 5, label: 'Category' },
    { id: 6, label: 'Company' },
    { id: 7, label: 'Branch' },
    { id: 8, label: 'Sector' }
];

// Styled Autocomplete for scrollbar
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiAutocomplete-listbox': {
        maxHeight: '200px', // Set a max height for the dropdown
        overflowY: 'auto', // Enable vertical scrolling
    },
    width: '100%', // Ensure the Autocomplete takes full width
}));

const CheckboxSelectList: React.FC = () => {
    const [selectedEmployees, setSelectedEmployees] = React.useState<Option[]>([]);
    const [selectedColumns, setSelectedColumns] = React.useState<Option[]>([]);

    const handleEmployeeChange = (
        event: React.SyntheticEvent,
        value: Option[],
        reason: AutocompleteChangeReason
    ): void => {
        if (value.some(option => option.id === 0)) {
            if (selectedEmployees.length === options.length - 1) {
                setSelectedEmployees([]);
            } else {
                setSelectedEmployees(options.filter(option => option.id !== 0));
            }
        } else {
            setSelectedEmployees(value);
        }
    };

    const handleColumnChange = (
        event: React.SyntheticEvent,
        value: Option[],
        reason: AutocompleteChangeReason
    ): void => {
        if (value.some(option => option.id === 0)) {
            if (selectedColumns.length === gridOptions.length - 1) {
                setSelectedColumns([]);
            } else {
                setSelectedColumns(gridOptions.filter(option => option.id !== 0));
            }
        } else {
            setSelectedColumns(value);
        }
    };

    const isAllEmployeesSelected = selectedEmployees.length === options.length - 1;
    const isAllColumnsSelected = selectedColumns.length === gridOptions.length - 1;

    return (
        <div style={{ display: 'flex', gap: '16px' }}> {/* Flexbox for horizontal layout */}
            <StyledAutocomplete
                multiple
                options={options}
                getOptionLabel={(option) => option.label}
                onChange={handleEmployeeChange}
                disableCloseOnSelect
                renderOption={(props, option: Option) => (
                    <li {...props}>
                        <Checkbox
                            checked={option.id === 0 ? isAllEmployeesSelected : selectedEmployees.some(selected => selected.id === option.id)}
                            color="primary"
                        />
                        {option.label}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select Employee" placeholder="Employees" />
                )}
                sx={{ flex: 1 }} // Make the first Autocomplete take up equal space
            />

            <StyledAutocomplete
                multiple
                options={gridOptions}
                getOptionLabel={(option) => option.label}
                onChange={handleColumnChange}
                disableCloseOnSelect
                renderOption={(props, option: Option) => (
                    <li {...props}>
                        <Checkbox
                            checked={option.id === 0 ? isAllColumnsSelected : selectedColumns.some(selected => selected.id === option.id)}
                            color="primary"
                        />
                        {option.label}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Specify Columns" placeholder="Columns" />
                )}
                sx={{ flex: 1 }} // Make the second Autocomplete take up equal space
            />
        </div>
    );
};

export default CheckboxSelectList;
