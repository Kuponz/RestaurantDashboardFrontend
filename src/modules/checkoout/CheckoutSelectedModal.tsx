import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const CheckoutSelectedIteamModal= ({orderValue,val,index,setValue,forceUpdate,variableip,specialInstruction,specialOpen,setSpecialOpen})=>{
return (
    <>
    <Stack sx={{
        gap:1
    }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton
          disabled={orderValue?.item?.selected?.length > 0}
          onClick={async () => {
            if (orderValue?.item?.selected?.length > 0) {
              console.log({
                v: val[index],
              });
              // val[index].item.selected.push(val[index].selected[val[index]?.selected?.length - 1]);
              console.log({
                val: val[index].item.selected[
                  val[index].item.selected.length - 1
                ],
              });
              let newValInd = {
                ...val[index].item.selected[
                  val[index].item.selected.length - 1
                ],
                id: uuidv4(),
              };
              console.log({ newValInd });
              val[index].item.selected.push(newValInd);
              // val[index].item.selected[val[index].item.selected.length -1].id = await Promise.all(uuidv4());
              // val[index].item.selected[-1]
              val[index].quantity += 1;
              setValue(val);
              forceUpdate();
            } else {
              variableip(orderValue.item, "+");
            }
          }}
          // onClick={()=>{return variableip(orderValue.item, "+")}}
        >
          <AddIcon />
        </IconButton>
        <Stack
          sx={{
            width: "4rem",
          }}
        >
          <TextField
            value={orderValue.quantity}
            onChange={(e) => variableip(orderValue.item, "*", e.target.value)}
          />
        </Stack>
        <IconButton
          onClick={() => {
            if (orderValue?.item?.selected?.length > 0) {
              console.log({
                v: val[index],
              });
              // val[index].item.selected.push(val[index].selected[val[index]?.selected?.length - 1]);
              console.log({
                val: val[index].item.selected[
                  val[index].item.selected.length - 1
                ],
              });
              val[index].item.selected.pop();
              // val[index].item.selected[-1]
              val[index].quantity -= 1;
              if (val[index].quantity == 0) {
                let newValI = val.filter((valu, valI) => index != valI);
                setValue(newValI);
                forceUpdate();
              } else {
                setValue(val);
                forceUpdate();
              }
            } else {
              variableip(orderValue.item, "-");
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
        {/* <IconButton color="error">
          <DeleteIcon />
        </IconButton> */}
      </Stack>
      <Stack>
        <Typography my={0.5}>{orderValue?.item?.itemName}</Typography>
        <Typography variant="body2" color={"primary"} sx={{}}>
          {orderValue?.item?.selected?.map((sel) => {
            return (
              <>
                {sel.variations.length > 0 &&
                  sel.variations.map((selu, id) => (
                    <span key={id}>
                      {
                        selu?.variationOptions?.find(
                          (elm) => elm._id == selu.selected
                        )?.optName
                      }{" "}
                      <br />
                    </span>
                  ))}
                x1 <br />
              </>
            );
          })}
        </Typography>

        <Typography color={"primary.main"} my={0.5}>
          {orderValue?.specialInstruction}
        </Typography>
      </Stack>
      <TextField
        label={"Instructions"}
        sx={{
          display: specialOpen ? "flex" : "none",
          my: 1,
        }}
        onChange={(e) => (specialInstruction.current = e.target.value)}
        rows={7}
        multiline
        fullWidth
      />
      <Button
        variant="outlined"
        sx={{
          display: specialOpen ? "none" : "flex",
        }}
        onClick={() => {
          setSpecialOpen(true);
        }}
      >
        Add Special Instruction
      </Button>
      <Button
        variant="outlined"
        sx={{
          display: specialOpen ? "flex" : "none",
        }}
        onClick={() => {
          setSpecialOpen(false);
          val[index].specialInstruction = specialInstruction.current;
        }}
      >
        Save
      </Button>
      </Stack>
    </>
)
}

export default CheckoutSelectedIteamModal