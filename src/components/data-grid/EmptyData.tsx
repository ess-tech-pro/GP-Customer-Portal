import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface EmptyDataProps {
  message?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({
  message = "no_rows",
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      color: "text.secondary",
    }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {t(message)}
      </Typography>
    </Box>
  )
};
export default EmptyData;
