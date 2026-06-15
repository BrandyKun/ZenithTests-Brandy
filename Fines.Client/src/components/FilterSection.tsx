import {
  Button,
  Collapse,
  Flex,
  Group,
  NativeSelect,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconFilterFilled,
} from "@tabler/icons-react";
import { FineTypeLabels } from "../enum/fineType";
import { Filters } from "../types/filters";

interface FilterSectionProps {
  value: Filters;
  onChange: (next: Filters) => void;
}

const fineTypeOptions = [
  { value: "", label: "Any" },
  ...Object.entries(FineTypeLabels).map(([key, label]) => ({
    value: key,
    label,
  })),
];

export function FilterSection({ value, onChange }: FilterSectionProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={toggle} mb="md" variant="subtle">
        <Group gap="xs">
          <IconFilterFilled size={16} />
          <Text>Filters</Text>
          {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Group>
      </Button>
      <Collapse in={opened}>
        <Paper shadow="xs" px="xl" py="md" mb="md">
          <Flex direction="row" gap="md" wrap="wrap">
            <DatePickerInput
              flex="0 1 16rem"
              label="Fine Date"
              placeholder="Any date"
              clearable
              value={value.fineDate}
              onChange={(fineDate) => onChange({ ...value, fineDate })}
            />
            <NativeSelect
              flex="0 1 16rem"
              label="Fine Type"
              data={fineTypeOptions}
              value={value.fineType}
              onChange={(event) =>
                onChange({ ...value, fineType: event.currentTarget.value })
              }
            />
            <TextInput
              flex="0 1 16rem"
              label="Vehicle Registration"
              placeholder="e.g. ABC123"
              value={value.vehicleRegNo}
              onChange={(event) =>
                onChange({ ...value, vehicleRegNo: event.currentTarget.value })
              }
            />
          </Flex>
        </Paper>
      </Collapse>
    </>
  );
}
