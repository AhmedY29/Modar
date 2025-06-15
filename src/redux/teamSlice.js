import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teams: [],
  isLoading: false,
};

export const getTeams = createAsyncThunk("team/getTeam", async () => {
  let res = await axios.get(
    "https://68457ab9fc51878754db71db.mockapi.io/teams"
  );
  let data = await res.data;
  return data;
});

export const addIdea = createAsyncThunk("team/addIdea", async (data) => {
  console.log(data);
  const res = await axios.get(
    `https://68457ab9fc51878754db71db.mockapi.io/teams/${data.teamId}`
  );
  const existingTeam = await res.data;
  const updatedIdeas = [...(existingTeam.ideas || []), data];
  console.log(existingTeam, "existing data");
  console.log(updatedIdeas, "");
  axios.put(
    `https://68457ab9fc51878754db71db.mockapi.io/teams/${data.teamId}`,
    {
      ...existingTeam,
      ideas: updatedIdeas,
    }
  );
});

// UPDATE IT
export const updateIdeaStatus = createAsyncThunk(
  "team/updateIdeaStatus",
  async (data) => {
    console.log(data);
    const res = await axios.get(
      `https://68457ab9fc51878754db71db.mockapi.io/teams/${data.teamId}`
    );

    const existingTeam = await res.data;
    const updatedIdeas = (existingTeam.ideas || []).map((idea) =>
      idea.ideaId === data.ideaId ? data : idea
    );

    const updateRes = await axios.put(
      `https://68457ab9fc51878754db71db.mockapi.io/teams/${data.teamId}`,
      {
        ...existingTeam,
        ideas: updatedIdeas,
      }
    );
  }
);

export const addTeam = createAsyncThunk("team/addTeam", async (data) => {
  axios.post("https://68457ab9fc51878754db71db.mockapi.io/teams", {
    supervisor: data.supervisor,
    students: data.students,
  });
});
export const editTeam = createAsyncThunk("team/editTeam", async (data) => {
  axios.put(`https://68457ab9fc51878754db71db.mockapi.io/teams/${data.id}`, {
    supervisor: data.supervisor,
    students: data.students,
  });
});
export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id) => {
  axios.delete(`https://68457ab9fc51878754db71db.mockapi.io/teams/${id}`);
});
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTeams.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.isLoading = false;
      });

    builder
      .addCase(addTeam.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(editTeam.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editTeam.fulfilled, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteTeam.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(addIdea.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addIdea.fulfilled, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateIdeaStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateIdeaStatus.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default teamSlice.reducer;
