import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';

function ComparePage() {
  return (
    <div>
      <h1>Compare Cars</h1>
      <p>
        This page will allow users to search for cars, add up to 4 cars to a comparison list, 
        and compare their combined MPG.
      </p>
    </div>
  );
}

export default ComparePage;
