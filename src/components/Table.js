
import React from "react";
import { render } from "react-dom";

import matchSorter from 'match-sorter'
import ModalView from './ModalView';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    
    
  }
  render() {
      
    return (
      <div>
        <ReactTable
          data={this.props.TableData}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            
            {
                Header: "Test Suite Details",
                columns: [
                    {
                        Header: "Suite Name",
                        id: "testPlanName",
                        accessor : "testPlanName",
                        filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["testPlanName"] }),
                      filterAll: true
                      },
                  {
                    Header: "Release",
                    id: "release",
                    accessor : "release",
                    filterable :false
                  },
                  {
                    Header: "Build Number",
                    id: "buildNumber",
                    accessor : "buildNumber",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["buildNumber"] }),
                  filterAll: true
                  },
                  {
                    Header: "Total Testcase",
                    
                    accessor : "totalTestcaseExecuted",
                    id:"totalTestcaseExecuted",
                    filterable :false
                  },
                  {
                    Header: "Total Pass",
                    accessor : "totalPass",
                    id:"totalPass",
                    filterable :false
                  },
                  {
                    Header: "Total Fail",
                    accessor : "totalBugFailure",
                    id:"totalBugFailure",
                    filterable :false
                  
                  },
                  {
                    Header: "Execution Date",
                    id:"executionDate",
                    accessor : "executionDate",
                      filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["executionDate"] }),
                  filterAll: true
                  },
                    {
                  Header: "Status",
                  accessor: "suiteStatus",
                  id: "over",
                  Cell: ({ value }) => (value == "Pass" ? "Passed" : "Failed"),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "Pass") {
                      return row[filter.id] == "Pass";
                    }
                    return row[filter.id] == "Fail";
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                    </select>
                },
                {
                    Header : "View Results",
                    filterable: false,
                    Cell: row => (<ModalView obj = {row.original}/>)
                }
                ]
              }           

          ]}
            defaultSorted={[
            {
              id: "testPlanName",
              desc: false
            }
          ]}
          defaultPageSize={10}
          className=" -highlight shadow"
        />
        <br />
      </div>
    );
  }
}



