import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface MenuTabsProps {
  onTabChange: (index: number) => void;
  tabsMenuOptions: string[];
}

export default function MenuTabsComponent({ onTabChange, tabsMenuOptions }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = tabsMenuOptions;

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    onTabChange(index);

  };

  return (
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index ? styles.activeTab : null,
            ]}
            onPress={() => handleTabPress(index)}>
            <Text style={[
                styles.tabText,
                activeTab === index ? styles.activeTabText : null,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    color: '#333',
  },
});
