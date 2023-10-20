import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Skeleton from "react-loading-skeleton";

function AccountSkeleton() {
  return (
    <>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="row path-breadcrumb">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
      <div className="page-content pt-150 pb-150">
        <div className="container">
          <div className="row">
            <Tabs className="col-lg-10 m-auto">
              <div className="row">
                <div className="col-md-3">
                  <div className="dashboard-menu">
                    <TabList className="nav flex-column" role="tablist">
                      <Tab className="nav-item">
                        <Skeleton style={{ height: "50px", width: "100%" }} />
                      </Tab>
                      <Tab className="nav-item">
                        <Skeleton style={{ height: "50px", width: "100%" }} />
                      </Tab>
                      <Tab className="nav-item">
                        <Skeleton style={{ height: "50px", width: "100%" }} />
                      </Tab>
                      <Tab className="nav-item">
                        <Skeleton style={{ height: "50px", width: "100%" }} />
                      </Tab>
                      <Tab className="nav-item">
                        <Skeleton style={{ height: "50px", width: "100%" }} />
                      </Tab>
                      <Skeleton style={{ height: "50px", width: "100%" }} />
                    </TabList>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="tab-content account dashboard-content pl-50">
                    <div>
                      <Skeleton style={{ height: "50px", width: "100%" }} />
                      <Skeleton style={{ height: "20px", width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSkeleton;
