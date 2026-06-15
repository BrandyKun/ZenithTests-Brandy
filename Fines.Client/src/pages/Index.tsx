import { Group, Loader, Paper, Table, Text } from "@mantine/core";
import { useFines } from "../hooks/useFines";
import { FineTypeLabels } from "../enum/fineType";
import { Filters } from "../types/filters";
import { FilterSection } from "../components/FilterSection";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { useState } from "react";

//setting defaults
const EMPTY_FILTERS: Filters = {
  fineDate: null,
  fineType: "",
  vehicleRegNo: "",
};

export default function Index() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const { fines, loading, error } = useFines(filters);

  const rows = fines.map((fine) => (
    <Table.Tr key={fine.id}>
      <Table.Td>{fine.fineNo}</Table.Td>
      <Table.Td>{fine.fineDate.toLocaleDateString()}</Table.Td>
      <Table.Td>{FineTypeLabels[fine.fineType]}</Table.Td>
      <Table.Td>{fine.vehicleRegNo}</Table.Td>
      <Table.Td>{fine.vehicleDriverName}</Table.Td>
      <Table.Td>{fine.customerName}</Table.Td>
    </Table.Tr>
  ));

  return (
    <main>
      <h2>Index</h2>

      <FilterSection value={filters} onChange={setFilters} />

      <Paper shadow="xs" p="xl">
        {loading ? (
          <Loader />
        ) : error ? (
          <Group gap="xs" c="red">
            <IconAlertTriangleFilled size={16} />
            <Text>{error}</Text>
          </Group>
        ) : fines.length === 0 ? (
          <Text c="dimmed">No fines match your filters.</Text>
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Fine Number</Table.Th>
                <Table.Th>Fine Date</Table.Th>
                <Table.Th>Fine Type</Table.Th>
                <Table.Th>Vehicle Registration</Table.Th>
                <Table.Th>Vehicle Driver Name</Table.Th>
                <Table.Th>Customer Name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        )}
      </Paper>
    </main>
  );
}
