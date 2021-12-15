import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div>
      <aside>
        <h3>WPR</h3>
        <header>
          <h2>HTML Quiz</h2>
        </header>

        <ul>
          <li>
            <NavLink
              to={{
                pathname: "/",
              }}
              activeclassname="active"
            >
              <i className="far fa-question-circle"></i> All questions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: "/add",
              }}
              activeclassname="active"
            >
              <i className="far fa-plus"></i> New question
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}
