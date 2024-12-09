import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
// import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CryptoTable = () => {
  const [crypto, setCrypto] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState(null)

  const handleOpen = (coin) => {
    setSelectedCoin(coin)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const getCrypto = async () => {
      try {
        const res = await axios.get('https://api.coincap.io/v2/assets')
        setCrypto(res.data.data)
        // console.log(res.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getCrypto()
  }, [])

   // Function to refresh the data when refresh button is clicked
//    const handleRefresh = () => {
//     const getCrypto = async () => {
//         try {
//           const res = await axios.get('https://api.coincap.io/v2/assets')
//           setCrypto(res.data.data)
//         } catch (error) {
//           console.log(error)
//         }
//       }
//       getCrypto()
//   }

    const handleRefresh = () => {
        window.location.reload()
    }

  return (
    <>

    {/* Refresh Button */}
      <Button variant="contained" color="primary" onClick={handleRefresh} style={{ margin: '10px' }}>
        Refresh
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Supply</TableCell>
              <TableCell>Max Supply</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crypto.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.name}</TableCell>
                <TableCell>{coin.symbol}</TableCell>
                <TableCell>${parseFloat(coin.priceUsd).toFixed(2)}</TableCell>
                <TableCell>{parseFloat(coin.supply).toLocaleString()}</TableCell>
                <TableCell>{coin.maxSupply ? parseFloat(coin.maxSupply).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleOpen(coin)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for coin details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
         {/* Close button at the top-right corner */}
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CancelIcon />
            </IconButton>
          {selectedCoin && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedCoin.name} ({selectedCoin.symbol})
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Price:</strong> ${parseFloat(selectedCoin.priceUsd).toFixed(2)}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Supply:</strong> {parseFloat(selectedCoin.supply).toLocaleString()}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Max Supply:</strong> {selectedCoin.maxSupply ? parseFloat(selectedCoin.maxSupply).toLocaleString() : 'N/A'}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Market Cap:</strong> ${parseFloat(selectedCoin.marketCapUsd).toLocaleString()}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Change (24h):</strong> {parseFloat(selectedCoin.changePercent24Hr).toFixed(2)}%
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default CryptoTable
