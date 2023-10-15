import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Radio,
  FormControl, 
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Grid,
} from "@mui/material";

const HomeAlumni = () => {
  
  return (
    <Div>
      {/* test no.12 TS form */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '400px' }}>A</TableCell>
              <TableCell style={{ width: '200px' }}></TableCell>
              <TableCell style={{ width: '400px' }}>B</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography>Sangat Rendah</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Sangat Tinggi</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
              <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography>Sangat Rendah</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Sangat Tinggi</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 1st row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Etika
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 2nd row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Keahlian berdasarkan bidang ilmu
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 3rd row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Bahasa Inggris
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 4th row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Penggunaan Teknologi Informasi
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 5th row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Komunikasi
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 6th row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Kerja sama tim
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
            {/* 7th row */}
            <TableRow>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure the Box takes full height of the TableCell
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          //value={questionnaireData.f1761}
                          //onChange={handleQuestionnaireChange}
                      >
                          <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                          <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                          <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                          <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                          <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                      </RadioGroup>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                    textAlign: 'center', // Center align text inside TableCell
                  }}
                >
                  Pengembangan
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', 
                  }}
                >
                  {/* Your component here */}
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      //value={questionnaireData.f1761}
                      //onChange={handleQuestionnaireChange}
                    >
                      <FormControlLabel value="1" control={<Radio size="small"/>} label="1" labelPlacement="bottom"/>
                      <FormControlLabel value="2" control={<Radio size="small"/>} label="2" labelPlacement="bottom"/>
                      <FormControlLabel value="3" control={<Radio size="small"/>} label="3" labelPlacement="bottom"/>
                      <FormControlLabel value="4" control={<Radio size="small"/>} label="4" labelPlacement="bottom"/>
                      <FormControlLabel value="5" control={<Radio size="small"/>} label="5" labelPlacement="bottom"/>
                    </RadioGroup>
                  </FormControl>
                </Box>
            </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


      <Box sx={{
        backgroundColor:"#E8EBE8", 
        height: "70px", 
        display: 'flex',
        alignItems: 'center',
        borderRadius: "5px",
        paddingLeft: "25px",
        marginTop: "100px",
      }}>
        <Typography sx={{
          fontSize: "16px", fontWeight: 500,
        }}>
          Silahkan mengisi form Tracer Study
        </Typography>
      </Box>

      
    </Div>
    
  )
}

export default HomeAlumni