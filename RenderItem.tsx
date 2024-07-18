import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Style from "./styles";
import { Task } from './App';

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  deleteFunction: (task: Task) => void;
}

// Componente para renderizar cada tarea
export default function RenderItem({ item, markDone, deleteFunction }: ItemProps) {
  return (
    <View style={Style.itemContainer}>
      <TouchableOpacity onPress={() => markDone(item)}>
        <Text style={item.done ? Style.textDone : Style.text}>{item.title}</Text>
        <Text style={item.done ? Style.textDone : Style.text}>{new Date(item.date).toLocaleDateString()}</Text>
      </TouchableOpacity>
      {item.done && (
        <TouchableOpacity style={Style.removeButton} onPress={() => deleteFunction(item)}>
          <Text style={Style.whiText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}