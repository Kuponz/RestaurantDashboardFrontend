import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { size } from 'theme/defaultFunction'
import CheckoutItem from './CheckoutItem'

const Checkout = () => {
  return (
    <Stack sx={{
        p:2,
        ...size("100%", "100%"),
    }}>
        <Stack>
            <Typography variant="h3">Checkout Items</Typography>
        </Stack>
        <Stack sx={{
            overflowY:"auto",
            py:2,
            overflowX:"hidden",
            gap:1,
        }}>
            {"    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam praesentium eos ab, et sit blanditiis quos quis quas consequuntur, at id eius dolor sunt, provident iure! Itaque sit eos unde tenetur sint quis repudiandae quas ullam deserunt, libero, accusantium cupiditate placeat vitae atque officiis ipsum maxime ipsam vero consectetur rerum eum dolores nobis. Saepe fugiat recusandae hic, vel, libero cum dolorum, totam quos corrupti eum culpa necessitatibus perferendis asperiores nobis doloribus delectus. Repellat, quis assumenda? Corporis, similique doloribus."
                .split(" ").map(elm=>(<CheckoutItem/>))
            }
        <CheckoutItem/>
        </Stack>
        <Stack>
            <Stack direction={"row"} sx={{

            }}>
                
                <Button>Cancel</Button>
                <Button>KOT</Button>
                <Button>Generate Bill</Button>
                <Button>Print Bill</Button>
            </Stack>
            <Stack>
                <Button>Collect</Button>

            </Stack>
        </Stack>
        
    </Stack>
  )
}

export default Checkout