import { actionsEnums } from "../common/actionsEnums";
import objectAssign = require("object-assign");
import { StudentEntity } from "../model/student";

class StudentState  {
  studentsList: StudentEntity[];
  editingStudent: StudentEntity;

  public constructor() {
    this.studentsList = [];
    this.editingStudent = new StudentEntity();
  }
}

export const studentReducer =  (state: StudentState = new StudentState(), action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return handleGetStudentList(state, action.payload);
    case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
      return handleGetStudent(state, action.payload);
    case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
      return handleFieldValueChanged(state, action.payload);
  }
  return state;
};

const handleGetStudentList = (state: StudentState, payload: StudentEntity[]) => {
  const newState = objectAssign({}, state, {studentsList: payload});
  return newState;
};

const handleGetStudent = (state: StudentState, payload: StudentEntity[]) => {
  const newState = objectAssign({}, state, {editingStudent: payload});
  return newState;
};

const handleFieldValueChanged = (state: StudentState, payload) => {
  const newStudent = objectAssign({}, state.editingStudent, {[payload.fieldName]: payload.value});
  return objectAssign({}, state, {editingStudent: newStudent});
};
