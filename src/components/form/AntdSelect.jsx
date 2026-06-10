import React from 'react';
import { Select } from 'antd';
const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};
const AntdSelect = ({data,label,placeholder}) => {
    return(
        <>
        <div className="inputBox mt-3">
        <label for="User Name" className="mb-1 block">{label}</label>
    <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={data}
        className='w-full'
        />
        </div>
        </>
)};
export default AntdSelect;