import "./App.css";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

import { useState } from "react";
import { useEffect } from "react";

export function CountsSeen({ count }: { count: number }) {
  const [countsSeen, setCountsSeen] = useState<number[]>([]);

  useEffect(() => {
    if (count > 0 && !countsSeen.includes(count)) {
      setCountsSeen([count, ...countsSeen]);
    }
  }, [count, countsSeen]);

  return (
    <>
      <Typography variant="h5" component="h2">
        Counts Seen
      </Typography>
      <List dense={true}>
        {countsSeen.map((countSeen) => (
          <ListItem key={countSeen}>
            <ListItemText primary={countSeen} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
