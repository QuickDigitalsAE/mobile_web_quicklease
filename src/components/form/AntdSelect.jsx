import React from 'react';
import { Select } from 'antd';
const AntdSelect = ({data,label,placeholder}) => {
    return(
        <>
        <div className="inputBox form-field">
        <label htmlFor="antd-select-field" className="form-field__label">{label}</label>
    <Select
        id="antd-select-field"
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        options={data}
        className='w-full compact-ant-select'
        />
        </div>
        </>
)};
export default AntdSelect;
