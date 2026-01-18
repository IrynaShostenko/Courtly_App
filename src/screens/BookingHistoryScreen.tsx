import React, { useMemo } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PrimaryButton from "@/src/components/PrimaryButton";
import ScreenHeader from "@/src/components/ScreenHeader";
import { COLORS } from "@/src/constants/colors";
import { SPACING } from "@/src/constants/spacing";
import { TYPOGRAPHY } from "@/src/constants/typography";

import { cancelBooking } from "@/src/store/bookingSlice";
import type { RootState } from "@/src/store/store";

function toStartMs(date: string, time: string) {
  return new Date(`${date}T${time}:00`).getTime();
}

function formatPrettyDateTime(dateIso: string, time: string) {
  const [y, m, d] = dateIso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d} ${months[dt.getMonth()]}, ${time}`;
}

export default function BookingHistoryScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.booking.history);

  const now = Date.now();

  const sorted = useMemo(() => {
    // newest first already, але лишимо стабільно:
    return [...history].sort(
      (a, b) => toStartMs(b.date, b.time) - toStartMs(a.date, a.time),
    );
  }, [history]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
      <ScreenHeader
        title="Booking History"
        leftText="Back"
        onLeftPress={() => navigation.goBack()}
      />

      {sorted.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text
            style={{ ...TYPOGRAPHY.bodyM, color: COLORS.neutralDarkDarkest }}
          >
            No bookings yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => {
            const start = toStartMs(item.date, item.time);
            const isPastOrNow = start <= now;
            const isCanceled = !!item.canceledAt;

            const canCancel = !isCanceled && !isPastOrNow;

            return (
              <View style={styles.card}>
                <Text style={styles.title}>
                  {formatPrettyDateTime(item.date, item.time)}
                </Text>

                <Text style={styles.rowText}>
                  Court: {item.courtType} · Duration: {item.duration} min
                </Text>

                {isCanceled ? (
                  <Text style={styles.statusCanceled}>Canceled</Text>
                ) : isPastOrNow ? (
                  <Text style={styles.statusPast}>Completed</Text>
                ) : (
                  <Text style={styles.statusUpcoming}>Upcoming</Text>
                )}

                <View style={{ marginTop: 12 }}>
                  {canCancel ? (
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          "Cancel booking?",
                          "You can cancel only future bookings.",
                          [
                            { text: "No" },
                            {
                              text: "Yes, cancel",
                              style: "destructive",
                              onPress: () => dispatch(cancelBooking(item.id)),
                            },
                          ],
                        );
                      }}
                      style={styles.cancelBtn}
                    >
                      <Text style={styles.cancelText}>Cancel booking</Text>
                    </Pressable>
                  ) : (
                    <PrimaryButton title="Cancel booking" onPress={() => {}} />
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: SPACING.radius,
    padding: 14,
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutralDarkDarkest,
    marginBottom: 6,
  },
  rowText: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.neutralDarkDarkest,
    opacity: 0.9,
  },
  statusUpcoming: {
    ...TYPOGRAPHY.captionM,
    color: COLORS.primaryGreen,
    marginTop: 8,
  },
  statusPast: {
    ...TYPOGRAPHY.captionM,
    color: COLORS.neutralDarkLight,
    marginTop: 8,
  },
  statusCanceled: {
    ...TYPOGRAPHY.captionM,
    color: COLORS.neutralDarkLight,
    marginTop: 8,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
    borderRadius: SPACING.radius,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.primaryGreen,
  },
});
