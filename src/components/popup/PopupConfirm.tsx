import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from "react-i18next";

interface PopupConfirmProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupConfirm = (props: PopupConfirmProps) => {
  const { t } = useTranslation();
  const { title, message, onConfirm, onCancel } = props;

  return (
    <Modal open onClose={onCancel}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 6,
      }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <WarningIcon color="warning" sx={{ fontSize: 30 }} />
          <Typography fontWeight={600} fontSize={20} lineHeight={1.3}>{title}</Typography>
        </Stack>
        <Typography variant="body1">{message}</Typography>
        <Stack direction='row' spacing={1} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button variant="outlined" color="primary" onClick={onCancel} sx={{
            textTransform: 'none',
          }}>{t('cancel')}</Button>
          <Button variant="contained" color="primary" onClick={onConfirm} sx={{
            textTransform: 'none',
          }}>{t('ok')}</Button>
        </Stack>
      </Box>
    </Modal>
  )
};
export default PopupConfirm;
