// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SharedNavbar from "../../components/SharedNavbar";

//Main
import Centers from "./Centers";
import Users from "./Users";
import Instructor from "./Instructor";
import Students from "./Students";

// Main Pages
import GraduatedStudent from "./GraduatedStudent";

// ADMIN
import HeadOfficeOverview from "../cbt_pages/HeadOfficeDashboard/HeadOfficeOverview";
import HeadOfficeCourses from "../cbt_pages/HeadOfficeDashboard/HeadOfficeCourses";
import HeadOfficeApprovals from "../cbt_pages/HeadOfficeDashboard/HeadOfficeApprovals";
import HeadOfficeReports from "../cbt_pages/HeadOfficeDashboard/HeadOfficeReports";

// DISTRICT MANAGER
import DistrictManagerOverview from "../cbt_pages/DistrictManagerDashboard/DistrictManagerOverview";
import DistrictManagerCourses from "../cbt_pages/DistrictManagerDashboard/DistrictManagerCourses";
import DistrictManagerApprovals from "../cbt_pages/DistrictManagerDashboard/DistrictManagerApprovals";
import DistrictManagerReports from "../cbt_pages/DistrictManagerDashboard/DistrictManagerReports";

// TRAINING OFFICER
import TrainingOfficerCourses from "../cbt_pages/TrainingOfficerDashboard/TrainingOfficerCourses";
import TrainingOfficerOverview from "../cbt_pages/TrainingOfficerDashboard/TrainingOfficerOverview";
import TrainingOfficerReports from "../cbt_pages/TrainingOfficerDashboard/TrainingOfficerReports";

// DATA ENTRY
import DataEntryStudents from "../cbt_pages/DataEntryDashboard/DataEntryStudents";
import DataEntryOverview from "../cbt_pages/DataEntryDashboard/DataEntryOverview";

// INSTRUCTOR
import InstructorOverview from "../cbt_pages/InstructorDashboard/InstructorOverview";
import InstructorCourses from "../cbt_pages/InstructorDashboard/InstructorCourses";
import InstructorStudents from "../cbt_pages/InstructorDashboard/InstructorStudents";
import InstructorAttendance from "../cbt_pages/InstructorDashboard/InstructorAttendance";

// NTT ADMIN
import NTTAdminDashboard from "../ntt_pages/AdminDashbords/NTTAdminDashboard";
import NTTApplicationsList from "../ntt_pages/DataEntryDashboards/NTTApplicationsList";
import NTTStudentPerformance from "../ntt_pages/AdminDashbords/NTTStudentPerformance";
import NTTResultsReports from "../ntt_pages/AdminDashbords/NTTResultsReports";

// NTT DATA ENTRY
import NTTDataEntryDashboard from "../ntt_pages/DataEntryDashboards/NTTDataEntryDashboard";
import NTTStudentPage from "../ntt_pages/DataEntryDashboards/NTTStudentPage";
import NTTExamManagement from "../ntt_pages/DataEntryDashboards/NNTTExamManagement";


const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const r = localStorage.getItem("user_role") || "";
    const first = localStorage.getItem("user_first_name") || "";
    const last = localStorage.getItem("user_last_name") || "";

    setRole(r);
    setUserName(`${first} ${last}`.trim() || "User");

    if (location.pathname === "/dashboard") {
      navigate(getDefaultPath(r), { replace: true });
    }
  }, [location.pathname]);

  const getDefaultPath = (r: string) => {
    const paths: any = {
      admin: "/dashboard/admin",
      district_manager: "/dashboard/manager",
      training_officer: "/dashboard/training_officer",
      data_entry: "/dashboard/data-entry",
      instructor: "/dashboard/instructor",
      ntt_admin: "/dashboard/ntt-admin",
      ntt_data_entry: "/dashboard/ntt-data-entry",
    };
    return paths[r] || "/dashboard/admin";
  };

  if (!role) return <div className="p-10 text-center">Loading Dashboard...</div>;

  const renderContent = () => {
    const p = location.pathname;

    // ADMIN
    if (role === "admin") {
      if (p === "/dashboard/admin") return <HeadOfficeOverview />;
      if (p === "/dashboard/admin/centers") return <Centers />;
      if (p === "/dashboard/admin/users") return <Users />;
      if (p === "/dashboard/admin/instructors") return <Instructor />;
      if (p === "/dashboard/admin/courses") return <HeadOfficeCourses />;
      if (p === "/dashboard/admin/students") return <Students />;
      if (p === "/dashboard/admin/approvals") return <HeadOfficeApprovals />;
      if (p === "/dashboard/admin/reports") return <HeadOfficeReports />;
      if (p === "/dashboard/admin/graduated-students") return <GraduatedStudent />;
    }

    // DISTRICT MANAGER
    if (role === "district_manager") {
      if (p === "/dashboard/manager") return <DistrictManagerOverview />;
      if (p === "/dashboard/manager/centers") return <Centers />;
      if (p === "/dashboard/manager/users") return <Users />;
      if (p === "/dashboard/manager/students") return <Students />;
      if (p === "/dashboard/manager/instructors") return <Instructor />;
      if (p === "/dashboard/manager/courses") return <DistrictManagerCourses />;
      if (p === "/dashboard/manager/approvals_dm") return <DistrictManagerApprovals />;
      if (p === "/dashboard/manager/reports") return <DistrictManagerReports />;
      if (p === "/dashboard/manager/graduated-students") return <GraduatedStudent />;
    }

    // TRAINING OFFICER
    if (role === "training_officer") {
      if (p === "/dashboard/training_officer") return <TrainingOfficerOverview />;
      if (p === "/dashboard/training_officer/courses") return <TrainingOfficerCourses />;
      if (p === "/dashboard/training_officer/users") return <Users />;
      if (p === "/dashboard/training_officer/instructors") return <Instructor />;
      if (p === "/dashboard/training_officer/reports") return <TrainingOfficerReports />;
    }

    // DATA ENTRY
    if (role === "data_entry") {
      if (p === "/dashboard/data-entry") return <DataEntryStudents />;
      if (p === "/dashboard/data-entry/overview") return <DataEntryOverview />;
      if (p === "/dashboard/data-entry/graduated-students") return <GraduatedStudent />;
    }

    // INSTRUCTOR
    if (role === "instructor") {
      if (p === "/dashboard/instructor") return <InstructorOverview />;
      if (p === "/dashboard/instructor/courses") return <InstructorCourses />;
      if (p === "/dashboard/instructor/student") return <InstructorStudents />;
      if (p === "/dashboard/instructor/attendance") return <InstructorAttendance />;
    }

    // NTT ADMIN
    if (role === "ntt_admin") {
      if (p === "/dashboard/ntt-admin") return <NTTAdminDashboard />;
      if (p === "/dashboard/ntt-admin/users") return <Users />;
      if (p === "/dashboard/ntt-admin/applications") return <NTTApplicationsList />;
      if (p === "/dashboard/ntt-admin/student-performance") return <NTTStudentPerformance />;
      if (p === "/dashboard/ntt-admin/reports") return <NTTResultsReports />;
    }

    // NTT DATA ENTRY
    if (role === "ntt_data_entry") {
      if (p === "/dashboard/ntt-data-entry") return <NTTDataEntryDashboard />;
      if (p === "/dashboard/ntt-data-entry/students") return <NTTStudentPage />;
      if (p === "/dashboard/ntt-data-entry/exams") return <NTTExamManagement />;
    }

    return <div className="p-10">Page Not Found</div>;
  };

  return (
    <SharedNavbar userRole={role as any} userName={userName}>
      {renderContent()}
    </SharedNavbar>
  );
};

export default Dashboard;