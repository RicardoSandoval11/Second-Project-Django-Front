import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { EntryDetails } from '../components/EntryDetails';
import { EntryFiltered } from '../components/EntryFiltered';
import { AllEntriesPage } from '../pages/AllEntriesPage';
import { DisplayMyEntries } from '../pages/DisplayMyEntries';
import { EntriesByCategory } from '../pages/EntriesByCategory';
import { FormEntryPage } from '../pages/FormEntryPage';
import { UpdateEntryForm } from '../pages/UpdateEntryForm';


export const EntryRoutes = () => {

  const { status } = useSelector( state => state.auth );

  return (
    <Routes>
      {/* BASE URL: entries/ */}
      {
        status == 'authenticated' ?
          <>
            <Route path='my-entries/' element={ <DisplayMyEntries/> } />
            <Route path='edition-entry/' element={<FormEntryPage/>}/>
            <Route path='update-entry/:id' element={<UpdateEntryForm/>}/>
          </>
        :
          <>
          </>
      }
      <Route path='list-all/' element={ <AllEntriesPage/> } />
      <Route path='entry-details/:id' element={ <EntryDetails/> } /> 
      <Route path='filter/:id' element={ <EntryFiltered/> } />
      <Route path='filter-category/:id' element={ <EntriesByCategory/> } />

      

      {/* REDIRECT USERS IF URL IS NOT FOUND */}
      <Route path='*' element={ <Navigate to='/'/> } />
    </Routes>
  )
}

