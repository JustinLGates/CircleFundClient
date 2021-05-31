import React, { Fragment } from "react";

const TestInfoTab = ({ platform, ticketData }) => {



  return (
    <Fragment>
      <div className="m-3 p-3 border">
        <div>
          {/* <SecondaryHeader text={platform + " Details"}></SecondaryHeader> */}
        </div>
        <label>Automation Status</label>
        <select>
          <option default>{platform === "iOS" ? ticketData.iosStatus : platform === "Web" ? ticketData.webStatus : ticketData.androidStatus}</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
          <option value="Blocked">Blocked</option>
          <option value="Unable">Unable</option>
          <option value="Invalid">Invalid</option>
        </select>

        <div className="p-3">
          <textarea className="w-100 text-grey" value="the original notes if there is any..." name="" id="" rows="7"></textarea>
        </div>
      </div>
    </Fragment>

  );
};

export default TestInfoTab;
