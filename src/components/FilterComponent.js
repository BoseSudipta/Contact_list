import React from "react";
import styled from "styled-components";
function FilterComponent  (props) {
  // function will call when add button is clicked
    const onTrigger = (e,val) => {
      props.parentCallback(val);
      e.preventDefault();
      }
    const Input = styled.input.attrs(props => ({
        type: "text",
        size: props.small ? 5 : undefined
      }))`
        height: 32px;
        width: 200px;
        border-radius: 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #e5e5e5;
        padding: 0 32px 0 16px;
      `;
 return(
   <div class="d-grid gap-2">
    <Input
      id="search"
      type="text"
      autoFocus="autoFocus"
      placeholder="Filter table data..."
      value={props.filterText}
      onChange={props.onFilter}
    />
    {!!props.addFlag ?
        <div class="px-2">
          <button type="button" class="btn btn-outline-success btn-sm w-25 " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>onTrigger(e,true)}>Add</button>
        </div>:''
        }
</div>)
}
export default FilterComponent;
