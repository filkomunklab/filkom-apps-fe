import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';

const MappingCPL = () => {
  const { major, kurikulum, kodeMK } = useParams();
  console.log(major);
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-semibold'>
          Matriks Hubungan Capaian Pembelajaran Lulusan dengan Bahan kajian
          Kurikulum Informatika {major}
        </h1>
      </div>
      <div className='flex items-center justify-center mb-8'>
        <div className='bg-white max-w-[1200px] w-full rounded-2xl overflow-clip shadow-md'>
          <div className='flex justify-between p-4 text-xl font-semibold text-white bg-primary'>
            <span>Mata kuliah</span>
            <span>07/59</span>
          </div>
          <div className='p-4 text-xl font-semibold text-center'>
            <h1>Struktur Data dan Algoritma/Data Structure and Algorithms</h1>
            <p className='font-normal text-gray-500'>Kode: {kodeMK}</p>
          </div>
        </div>
      </div>
      <div className='mb-8'>
        <div className='grid grid-cols-10 p-4 m-0 font-bold bg-gray-200 border-b tet-xl'>
          <div className='flex items-center col-span-1'>Kode CPL</div>
          <div className='flex items-center col-span-8'>Deskripsi</div>
          <div className='flex items-center col-span-1'>Action</div>
        </div>
        <div>
          <Accordion className='!bg-primary !m-0 !rounded-none' defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='text-white' />}
              aria-controls='panel1-content'
              color='primary'
              id='panel1-header'>
              <h2 className='w-full text-2xl font-semibold text-center text-white'>
                SIKAP
              </h2>
            </AccordionSummary>
            <AccordionDetails className='!p-0 bg-white'>
              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <div className='grid grid-cols-10 p-2 border-b' key={i}>
                      <div className='flex items-center col-span-1'>S{i}</div>
                      <div className='flex items-center col-span-8'>
                        Berperan sebagai warga negara yang bangga dan cinta
                        tanah air, memiliki nasionalisme serta rasa tanggung
                        jawab pada negara dan bangsa;
                      </div>
                      <div className='flex items-center col-span-1'>
                        <Checkbox label={`S${i}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className='!bg-primary !m-0 !rounded-none'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='text-white' />}
              aria-controls='panel2-content'
              color='primary'
              id='panel2-header'>
              <h2 className='w-full text-2xl font-semibold text-center text-white'>
                PENGETAHUAN
              </h2>
            </AccordionSummary>
            <AccordionDetails className='!p-0 bg-white'>
              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <div className='grid grid-cols-10 p-2 border-b' key={i}>
                      <div className='flex items-center col-span-1'>S{i}</div>
                      <div className='flex items-center col-span-8'>
                        Berperan sebagai warga negara yang bangga dan cinta
                        tanah air, memiliki nasionalisme serta rasa tanggung
                        jawab pada negara dan bangsa;
                      </div>
                      <div className='flex items-center col-span-1'>
                        <Checkbox label={`S${i}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className='!bg-primary !m-0 !rounded-none'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='text-white' />}
              aria-controls='panel3-content'
              color='primary'
              id='panel3-header'>
              <h2 className='w-full text-2xl font-semibold text-center text-white'>
                KETERAMPILAN UMUM
              </h2>
            </AccordionSummary>
            <AccordionDetails className='!p-0 bg-white'>
              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <div className='grid grid-cols-10 p-2 border-b' key={i}>
                      <div className='flex items-center col-span-1'>S{i}</div>
                      <div className='flex items-center col-span-8'>
                        Berperan sebagai warga negara yang bangga dan cinta
                        tanah air, memiliki nasionalisme serta rasa tanggung
                        jawab pada negara dan bangsa;
                      </div>
                      <div className='flex items-center col-span-1'>
                        <Checkbox label={`S${i}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className='!bg-primary !m-0 !rounded-none'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className='text-white' />}
              aria-controls='panel4-content'
              color='primary'
              id='panel4-header'>
              <h2 className='w-full text-2xl font-semibold text-center text-white'>
                KETERAMPILAN KHUSUS
              </h2>
            </AccordionSummary>
            <AccordionDetails className='!p-0 bg-white'>
              <div>
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <div className='grid grid-cols-10 p-2 border-b' key={i}>
                      <div className='flex items-center col-span-1'>S{i}</div>
                      <div className='flex items-center col-span-8'>
                        Berperan sebagai warga negara yang bangga dan cinta
                        tanah air, memiliki nasionalisme serta rasa tanggung
                        jawab pada negara dan bangsa;
                      </div>
                      <div className='flex items-center col-span-1'>
                        <Checkbox label={`S${i}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          className='!rounded-full !bg-gray-200 !text-gray-400'
          variant='contained'>
          Sebelumnya
        </Button>
        <Button className='!rounded-full' variant='contained' color='primary'>
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default MappingCPL;
