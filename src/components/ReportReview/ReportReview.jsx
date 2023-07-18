import React, { useState } from "react";
import { reportReview } from "../api-handlers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReportReview = ({ reviewId }) => {
  const [isInappropriate, setIsInappropriate] = useState(false);
  const [isNotAccurate, setIsNotAccurate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await reportReview(
        reviewId,
        isInappropriate ? 1 : 0,
        isNotAccurate ? 1 : 0
      );

      // Reset the form
      setIsInappropriate(false);
      setIsNotAccurate(false);
    } catch (error) {
      setError("Failed to report the review");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>...</DialogTrigger>
      <div>
        {error && <p>{error}</p>}
        <DialogContent>
          <label>
            <input
              type="checkbox"
              checked={isInappropriate}
              onChange={(e) => setIsInappropriate(e.target.checked)}
            />
            Inappropriate
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={isNotAccurate}
              onChange={(e) => setIsNotAccurate(e.target.checked)}
            />
            Not Accurate
          </label>

          <br />

          <button onClick={handleReport} disabled={isLoading}>
            {isLoading ? "Reporting..." : "Report"}
          </button>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ReportReview;
