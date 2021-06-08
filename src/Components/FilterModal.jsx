import React from "react";
import Button from "./SmallElements/Button/Button"

const filterModal = () => {
  return (
    <div>
      <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="filterModal">Filters</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className="p-3">

              <div className="px-5 mx-5 pt-3">
                <div class="modal-footer">
                  <Button text={"APPLY"} onclick={() => console.log("clicked apply")} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default filterModal;
