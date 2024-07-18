import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import Style from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderItem from "./RenderItem";
import { Picker } from '@react-native-picker/picker';

export interface Task {
  title: string;
  done: boolean;
  date: Date;
  category: string;
}

const defaultCategories = ["Work", "Personal", "Urgent"];

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Saving error", e);
    }
  };

  const getData = async () => {
    try {
      const tasksValue = await AsyncStorage.getItem('mytodo-tasks');
      const categoriesValue = await AsyncStorage.getItem('mytodo-categories');
      if (tasksValue !== null) {
        setTasks(JSON.parse(tasksValue));
      }
      if (categoriesValue !== null) {
        setCategories(JSON.parse(categoriesValue));
      }
    } catch (e) {
      console.error("Reading error", e);
    }
    setLoading(false);
  };

  const addTask = () => {
    if (tasks.some(task => task.title === text)) {
      Alert.alert("Error", "Task with the same title already exists.");
      return;
    }
    const newTask: Task = {
      title: text,
      done: false,
      date: new Date(),
      category: selectedCategory,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storeData('mytodo-tasks', updatedTasks);
    setText('');
  };

  const markDone = (task: Task) => {
    const updatedTasks = tasks.map(t => t.title === task.title ? { ...t, done: !t.done } : t);
    setTasks(updatedTasks);
    storeData('mytodo-tasks', updatedTasks);
  };

  const deleteFunction = (task: Task) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes", onPress: () => {
            const updatedTasks = tasks.filter(t => t.title !== task.title);
            setTasks(updatedTasks);
            storeData('mytodo-tasks', updatedTasks);
          }
        }
      ]
    );
  };

  const addCategory = (newCategory: string) => {
    if (!categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setSelectedCategory(newCategory);
      storeData('mytodo-categories', updatedCategories);
    } else {
      Alert.alert("Error", "Category already exists.");
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'All' || task.category === selectedCategory)
  );

  if (loading) {
    return (
      <View style={[Style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Mis tareas por hacer</Text>

      <View style={Style.inputContainer}>
        <TextInput
          placeholder="Agregar una nueva tarea"
          onChangeText={setText}
          value={text}
          style={Style.textInput}
        />
        <TouchableOpacity onPress={addTask} style={Style.addButton}>
          <Text style={Style.whiText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.inputContainer}>
        <TextInput
          placeholder="Nueva categoría"
          onSubmitEditing={(e) => addCategory(e.nativeEvent.text)}
          style={Style.textInput}
        />
      </View>

      <View style={Style.inputContainer}>
        <TextInput
          placeholder="Buscar tareas"
          onChangeText={setSearchText}
          value={searchText}
          style={Style.textInput}
        />
      </View>

      <View>
        <Text>Filtrar por categoría:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue: string) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      <View style={Style.scrollContainer}>
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              deleteFunction={deleteFunction}
              markDone={markDone}
            />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
}
