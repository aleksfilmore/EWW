/**
 * ConfirmModal — branded in-app replacement for Alert.alert.
 *
 * Two-button modal (primary action + dismiss) styled to the EWW-niverse
 * dark-lab theme. Renders above everything via React Native Modal.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Colors, FontFamily, Radius, Spacing } from '@/constants/design';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  dismissLabel: string;
  onDismiss: () => void;
}

export function ConfirmModal({
  visible,
  title,
  message,
  primaryLabel,
  onPrimary,
  dismissLabel,
  onDismiss,
}: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Biohazard icon — keeps it on-brand */}
          <Text style={styles.icon}>☣</Text>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.dismissBtn}
              onPress={onDismiss}
              activeOpacity={0.8}
            >
              <Text style={styles.dismissLabel}>{dismissLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={onPrimary}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryLabel}>{primaryLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex:             1,
    backgroundColor:  'rgba(8, 3, 18, 0.88)',
    alignItems:       'center',
    justifyContent:   'center',
    paddingHorizontal: Spacing.xl,
  },

  card: {
    width:            '100%',
    backgroundColor:  Colors.bg.card,
    borderRadius:     Radius.xl,
    borderWidth:      2,
    borderColor:      Colors.border.DEFAULT,
    padding:          Spacing.lg,
    alignItems:       'center',
    gap:              12,
    shadowColor:      Colors.eww.purple,
    shadowOffset:     { width: 0, height: 8 },
    shadowOpacity:    0.5,
    shadowRadius:     16,
    elevation:        12,
  },

  icon: {
    fontSize:   40,
    color:      Colors.eww.green,
    lineHeight: 44,
  },

  title: {
    fontFamily:    FontFamily.creepster,
    fontSize:      28,
    color:         Colors.text.primary,
    letterSpacing: 1.5,
    textAlign:     'center',
  },

  message: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.secondary,
    textAlign:  'center',
    lineHeight: 25,
    paddingHorizontal: 4,
  },

  btnRow: {
    flexDirection: 'row',
    gap:           10,
    width:         '100%',
    marginTop:     4,
  },

  dismissBtn: {
    flex:              1,
    backgroundColor:   Colors.bg.elevated,
    borderRadius:      Radius.lg,
    paddingVertical:   14,
    alignItems:        'center',
    borderWidth:       1,
    borderColor:       Colors.border.subtle,
  },
  dismissLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.muted,
    letterSpacing: 0.5,
  },

  primaryBtn: {
    flex:            1,
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.lg,
    paddingVertical: 14,
    alignItems:      'center',
    shadowColor:     Colors.eww.greenDark,
    shadowOffset:    { width: 0, height: 3 },
    shadowOpacity:   0.4,
    shadowRadius:    6,
    elevation:       4,
  },
  primaryLabel: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         '#000',
    letterSpacing: 1,
  },
});
