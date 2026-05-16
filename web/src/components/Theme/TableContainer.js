import { Link } from "react-router-dom";

export default function TableContainer({ label, addButton, route, table, children }) {
  return (
    <section className="content" style={{ paddingTop: 30 + "px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title" style={{ marginRight: 850 + "px" }}>
                  {label}
                </h3>

                <Link to={route} className="btn btn-success float-left" style={{paddingRight:10 +"px" }}>
                  {addButton}
                </Link>
              </div>
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
