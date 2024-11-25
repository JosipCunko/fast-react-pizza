/* eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserAddress } from "../../apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  name: "",
  address: "", //home address
  position: {}, //lat and lng
  status: "idle",
  error: "",
};

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addresObj = await getUserAddress(position);
    const address = `${addresObj?.locality} ${addresObj?.city}, ${addresObj?.countryName}`;

    return { address, position };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a probled getting your position. Make sure to fill this manually.";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = action.payload.position;
      }),
});

export const { setName } = userSlice.actions; // action creators
export default userSlice.reducer;
